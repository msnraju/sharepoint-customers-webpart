import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ICompaniesDropdownProps {
    context: WebPartContext;
    environment: string;
    onChange: (value) => void;
}
