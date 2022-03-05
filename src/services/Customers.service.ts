import { WebPartContext } from "@microsoft/sp-webpart-base";
import { AadHttpClient, AadHttpClientResponse } from '@microsoft/sp-http';
import { ClientUrl } from "../config/WebAPIs.constants";
import { Customer } from "../models/Customer.model";
import { APIResponse } from "../models/APIResponse.model";

export default class CustomerService {
  constructor(private context: WebPartContext, private environment: string, private companyId: string) {
    this.environment = environment || "Production";
  }

  public getCustomers(): Promise<Customer[]> {
    return new Promise((resolve, reject) => {
      if (!this.companyId) {
        reject(new Error('Company ID should not be blank.'));
        return;
      }

      const apiUrl = `${ClientUrl}/v2.0/${this.environment}/api/v2.0/companies(${this.companyId})/customers`;

      this.context.aadHttpClientFactory
        .getClient(ClientUrl)
        .then((client: AadHttpClient): void => {
          client
            .get(apiUrl, AadHttpClient.configurations.v1)
            .then((response: AadHttpClientResponse) => {
              if (response.ok) {
                response.json()
                  .then((apiResponse: APIResponse<Customer>) => {
                    resolve(apiResponse.value);
                  });
              } else {
                response.text().then(text => {
                  const apiResponse = JSON.parse(text);
                  reject(apiResponse.error);
                });
              }
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

