import Axios from '@/plugins/axios';
import api from '@/api';
// import store from '@/store';
import { populateUrl } from '@/utils/utils';
import { getDimention, transformVwToPx } from '@/utils/utils';

export default {
    // demo...
    getEcharts(data: any) {
        // const url = populateUrl(api.getEcharts);
        // axios.get(url);
        return Axios.get(api.getOperationEcharts, {params: {...data}});
    },
    getVacantEcharts(data: any) {
        // const url = populateUrl(api.getEcharts);
        // axios.get(url);
        return Axios.get(api.getVacanciesReport, {params: {...data}});
    },
    getTakeHouseEcharts(data: any) {
        // const url = populateUrl(api.getEcharts);
        // axios.get(url);
        return Axios.get(api.getObtainedHouses, {params: {...data}});
    },
    getDataStatusEcharts(resource: any) {
        // return Axios.get(api.getdataStatesReport);
        const url = api.getdataStatesReport + '?state=' + resource.resource.toUpperCase();
        return Axios.get(url);
    },
    getMainFlowEcharts(resource: any) {
        // const url = populateUrl(api.getMainFlowEcharts, resource);
        const url = api.getMainFlowEcharts + '?channel=' + resource.resource.toUpperCase();
        return Axios.get(url);
    }
};
