import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'CustomersWebPartStrings';
import Customers from './components/Customers';
import { ICustomersProps } from './components/ICustomersProps';

export interface ICustomersWebPartProps {
  environment: string;
}

export default class CustomersWebPart extends BaseClientSideWebPart<ICustomersWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ICustomersProps> = React.createElement(
      Customers,
      { context: this.context, environment: this.properties.environment }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('environment', {
                  label: strings.EnvironmentFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
