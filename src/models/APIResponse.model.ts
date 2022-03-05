export interface APIResponse<T> {
    "@odata.context": string;
    value: T[];
}
