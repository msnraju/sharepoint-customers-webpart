import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ICustomerListProps {
  context: WebPartContext;
  environment: string;
  companyId: string;
}
