import * as React from 'react';
import { Loader, Segment, Text, List, Card, CardHeader, CardBody } from '@fluentui/react-northstar';
import { ICustomerListProps } from './ICustomerListProps';
import { Customer } from '../../../../models/Customer.model';
import CustomerService from '../../../../services/Customers.service';

interface ICustomerListState {
  customers: Customer[];
  loaded: boolean;
  hasError: boolean;
  error?: Error;
}

export default class CustomerList extends React.Component<ICustomerListProps, ICustomerListState, {}> {
  constructor(props: ICustomerListProps) {
    super(props);
    this.state = { customers: [], loaded: false, hasError: false };
  }

  public componentDidMount() {
    this.getCustomers();
  }

  public componentDidUpdate(prevProps: ICustomerListProps) {
    if (prevProps.companyId != this.props.companyId) {
      this.getCustomers();
    }
  }

  public render(): React.ReactElement<ICustomerListProps> {
    return (<Card fluid ghost>
      <CardHeader><Text weight="bold" content="Customers" /></CardHeader>
      <CardBody>{this.renderBody()}</CardBody>
    </Card>);
  }

  public renderBody() {
    if (!this.props.companyId) {
      return (<Text content="You must select a Company." />);
    }

    if (!this.state.loaded) {
      return (<Loader label="Loading..." />);
    }

    if (this.state.hasError)
      return (
        <Segment inverted color="red">
          <Text style={{ whiteSpace: "pre-wrap" }} as="pre" content={`${this.state.error.message}`} />
        </Segment>);

    const listItems = this.state.customers.map(customer => {
      return {
        key: customer.id,
        header: customer.displayName,
        content: `${customer.addressLine1} ${customer.addressLine2} ${customer.city} ${customer.postalCode}`
      };
    });

    return (<List navigable items={listItems} />);
  }

  private getCustomers() {
    const { context, environment, companyId } = this.props;

    if (!companyId) {
      this.setState({ customers: [], loaded: false, hasError: false, error: null });
    }

    const service = new CustomerService(context, environment, companyId);
    service.getCustomers()
      .then(customers => {
        this.setState({ customers: customers, loaded: true, hasError: false, error: null });
      })
      .catch(error => {
        this.setState({ customers: [], loaded: true, hasError: true, error: error });
      });
  }
}
