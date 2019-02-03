export interface EchartState {
    operationData?: any;
    vacantData?: any;
    takeHouseData?: any;
    dataStatus?: any;
    dataStatusResign?: any;
    dataStatusApplyFailure?: any;
    dataStatusMismatch?: any;
    mainFlowFilter?: any;
    mainFlowData?: any;
    isLoading?: boolean;
    mainFlowIsError?: boolean|string;
}
export interface StatusInterface {
    [key: string]: string;
    R_C_RESIGN: string;
    R_C_FINANCIAL_PAYMENT_FAILED: string;
    ROOM_UNMATCHED: string;
}
