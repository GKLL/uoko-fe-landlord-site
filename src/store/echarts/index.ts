import { Module, ActionTree, MutationTree, GetterTree } from 'vuex';
import { EchartState, StatusInterface } from './types';
import { RootState } from '../types';
import request from '@/request';

const DATA_STADUS: StatusInterface = {
    R_C_RESIGN: 'setDataStatusResign',
    R_C_FINANCIAL_PAYMENT_FAILED: 'setDataStatusApplyFailure',
    ROOM_UNMATCHED: 'setDataStatusMismatch',
};

// state
export const state: EchartState = {
    operationData: {}, // 运营数据
    vacantData: {}, // 空置数据
    takeHouseData: {}, // 拿房数据
    dataStatus: {}, // 数据状态
    dataStatusResign: {}, // 打回重签数据
    dataStatusApplyFailure: {}, // 金融支付失败申请数据
    dataStatusMismatch: {}, // 不匹配数据
    mainFlowFilter: 'all', // 当前显示的主站流量 all website mobile
    mainFlowData: { // 主站流量
        all: {},
        website: {},
        mobile: {},
    },
    mainFlowIsError: '',
    isLoading: false,
};

// getters
export const getters: GetterTree<EchartState, RootState> = {
    operationData(state: EchartState): any {
        return state.operationData;
    },
    vacantData(state: EchartState): any {
        return state.vacantData;
    },
    takeHouseData(state: EchartState): any {
        return state.takeHouseData;
    },
    dataStatus(state: EchartState): any {
        return state.dataStatus;
    },
    dataStatusResign(state: EchartState): any {
        return state.dataStatusResign;
    },
    dataStatusApplyFailure(state: EchartState): any {
        return state.dataStatusApplyFailure;
    },
    dataStatusMismatch(state: EchartState): any {
        return state.dataStatusMismatch;
    },
    mainFlowFilter(state: EchartState): any {
        return state.mainFlowFilter;
    },
    mainFlowData(state: EchartState): any {
        return state.mainFlowData;
    },
    mainFlowIsError(states): any {
        return state.mainFlowIsError;
    },
    // 组装echarts数据
    showFlowData(states): any {
        const flowData: any = state.mainFlowData[state.mainFlowFilter];
        if (JSON.stringify(flowData) === '{}' || !flowData) {
            return {};
        }
        const compareData: any = {
            pv: {
                range: flowData.pageView.growthRate * 100,
                number: flowData.pageView.total
            },
            uv: {
                range: flowData.uniqueVisitor.growthRate * 100,
                number: flowData.uniqueVisitor.total
            },
        };
        const d: any = {
            name: '点击量',
            type: 'line',
            smooth: true,
            areaStyle: {}
        };
        const seriesPV: any[] = [Object.assign({}, d, {
            data: flowData.pageView.hourlyData,
        })];
        const seriesUV: any[] = [Object.assign({}, d, {
            data: flowData.uniqueVisitor.hourlyData,
        })];
        const bigData: any = {
            color: ['#93C3C7'],
            // title: { text: 'PV数据' }
            tooltip : {
                trigger: 'axis',
                formatter: '{b}:00 {a}:{c}'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type : 'category',
                    boundaryGap : false,
                    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
                }
            ],
            yAxis: [
                {
                    type : 'value'
                }
            ],
            // series: []
        };
        const PVflowData: any = Object.assign({}, bigData, {
            // title: { text: 'PV数据' },
            series: seriesPV
        });
        const UVflowData: any = Object.assign({}, bigData, {
            // title: { text: 'UV数据' },
            series: seriesUV
        });
        const chartsData: any = {
            compareData,
            PVflowData,
            UVflowData
        };
        return chartsData;
    }
};

// mutations
export const mutations: MutationTree<EchartState> = {
    // 设置运营数据
    setOperationData(state: EchartState, payload: any) {
        const title = payload.chartsList.title.text;
        const chartsList = JSON.parse(JSON.stringify(payload.chartsList));
        delete chartsList.title;
        state.operationData = {
            seriesList: payload.seriesList,
            chartsList,
            model: payload.model,
            title,
        };
    },
    // 设置空置数据
    setVacantData(state, payload: any) {
        const title = payload.chartsList.title.text;
        const chartsList = JSON.parse(JSON.stringify(payload.chartsList));
        delete chartsList.title;
        state.vacantData = {
            seriesList: payload.seriesList,
            chartsList,
            model: payload.model,
            title,
        };
    },
    // 设置拿房数据
    setTakeHouseData(state, payload: any) {
        const title = payload.chartsList.title.text;
        const chartsList = JSON.parse(JSON.stringify(payload.chartsList));
        delete chartsList.title;
        state.takeHouseData = {
            seriesList: payload.seriesList,
            chartsList,
            model: payload.model,
            title,
        };
    },
    // 设置数据状态-打回重签数据
    setDataStatusResign(state, payload: any) {
        const title = payload.chartsList.title.text;
        const chartsList = JSON.parse(JSON.stringify(payload.chartsList));
        delete chartsList.title;
        state.dataStatusResign = {
            seriesList: payload.seriesList,
            chartsList,
            model: payload.model,
            title,
        };
    },
    // 设置数据状态-金融支付失败申请数据
    setDataStatusApplyFailure(state, payload: any) {
        const title = payload.chartsList.title.text;
        const chartsList = JSON.parse(JSON.stringify(payload.chartsList));
        delete chartsList.title;
        state.dataStatusApplyFailure = {
            seriesList: payload.seriesList,
            chartsList,
            title,
            timodel: payload.model,
        };
    },
    // 设置数据状态-不匹配数据
    setDataStatusMismatch(state, payload: any) {
        const title = payload.chartsList.title.text;
        const chartsList = JSON.parse(JSON.stringify(payload.chartsList));
        delete chartsList.title;
        state.dataStatusMismatch = {
            seriesList: payload.seriesList,
            chartsList,
            title,
            model: payload.model,
        };
    },
    setMainFlowFilter(state, payload: any) {
        state.mainFlowFilter = payload.value;
    },
    // 设置数据状态
    setMainFlow(state, payload: any) {
        const filter: string = state.mainFlowFilter;
        state.mainFlowData[filter] = payload;
    },
    setMainFlowError(state, payload: string) {
        state.mainFlowIsError = payload;
    },
};

/**
 * @Description: 简单格式化一下日期
 */
function initDate() {
    let date: string = '';
    new Date().toLocaleDateString().split('/').map((val: string, i: number) => {
        if (i > 0) {
            Number(val) < 10 ?  date += `-0${val}` : date += `-${val}`;
        } else {
            date += val;
        }
    });
    return date;
}

// actions
export const actions: ActionTree<EchartState, RootState> = {
    // 获取运营数据
    async getOperationData({ commit }): Promise<void> {
        try {
            const params: any = {
                date: initDate(),
            };
            const { data } = await request.getEcharts(params);
            if (data.code === '000') {
                commit('setOperationData', data.data);
            }
        } catch (e) {
            console.log('数据加载错误');
        }
    },
    // 获取空置数据
    async getVacantData({ commit }): Promise<void> {
        try {
            const params: any = {
                date: initDate(),
            };
            const { data } = await request.getVacantEcharts(params);
            if (data.code === '000') {
                commit('setVacantData', data.data);
            }
        } catch (e) {
            console.log('数据加载错误');
        }
    },
    // 获取拿房数据
    async getTakeHouseData({ commit }): Promise<void> {
        try {
            const params: any = {
                date: initDate(),
            };
            const { data } = await request.getTakeHouseEcharts(params);
            if (data.code === '000') {
                commit('setTakeHouseData', data.data);
            }
        } catch (e) {
            console.log('数据加载错误');
        }
    },
    // 获取数据异常
    async getDataStatus({ commit }, payload: string): Promise<void> {
        try {
            const { data } = await request.getDataStatusEcharts({ resource: payload });
            if (data.data) {
                commit(DATA_STADUS[payload], data.data);
            }
        } catch (e) {
            console.log('数据加载错误');
        }
    },
    // 获取主站流量
    async getMainFlow({ commit, state }): Promise<void> {
        try {
            const filter = state.mainFlowFilter;
            const { data } = await request.getMainFlowEcharts({ resource: filter });
            if (data.code === '000') {
                commit('setMainFlow', data.data);
            }
        } catch (e) {
            commit('setMainFlowError', e.message);
        }
    }
};

const namespaced: boolean = true;

export const echarts: Module<EchartState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};


