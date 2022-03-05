import * as React from 'react';
import { Provider, teamsTheme } from '@fluentui/react-northstar';
import CompaniesDropdown from './companies-dropdown/CompaniesDropdown';
import CustomerList from './customer-list/CustomerList';
import { ICustomersProps } from './ICustomersProps';

interface ICustomersState {
  companyId: string;
}

export default class Customers extends React.Component<ICustomersProps, ICustomersState, {}> {
  constructor(props: ICustomersProps) {
    super(props);
    this.state = { companyId: null };
  }

  private onChange(value: string) {
    this.setState({ companyId: value });
  }

  public render(): React.ReactElement<ICustomersProps> {
    return (
      <Provider theme={teamsTheme}>
        <CompaniesDropdown {... this.props} onChange={this.onChange.bind(this)} />
        <br />
        <CustomerList {... this.props} companyId={this.state.companyId} ></CustomerList>
      </Provider>
    );
  }
}
