export interface Customer {
    "@odata.etag": string;
    id: string;
    number: string;
    displayName: string;
    type: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    phoneNumber: string;
    email: string;
    website: string;
    salespersonCode: string;
    balanceDue: number;
    creditLimit: number;
    taxLiable: boolean;
    taxAreaId: string;
    taxAreaDisplayName: string;
    taxRegistrationNumber: string;
    currencyId: string;
    currencyCode: string;
    paymentTermsId: string;
    shipmentMethodId: string;
    paymentMethodId: string;
    blocked: string;
    lastModifiedDateTime: Date;
}