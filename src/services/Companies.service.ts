import { WebPartContext } from "@microsoft/sp-webpart-base";
import { AadHttpClient, AadHttpClientResponse } from '@microsoft/sp-http';
import { ClientUrl } from "../config/WebAPIs.constants";
import { APIResponse } from "../models/APIResponse.model";
import { Company } from "../models/Company.model";

export default class CompaniesService {
    constructor(private context: WebPartContext, private environment: string) {
        this.environment = environment || "Production";
    }

    public getCompanies(): Promise<Company[]> {
        return new Promise((resolve, reject) => {
            const apiUrl = `${ClientUrl}/v2.0/${this.environment}/api/v2.0/companies`;

            this.context.aadHttpClientFactory
                .getClient(ClientUrl)
                .then((client: AadHttpClient): void => {
                    client
                        .get(apiUrl, AadHttpClient.configurations.v1)
                        .then((response: AadHttpClientResponse) => {
                            if (response.ok) {
                                return response.json()
                                    .then((apiResponse: APIResponse<Company>): void => {
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
                }).catch(error => {
                    reject(error);
                });
        });
    }
}

