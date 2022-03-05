import * as React from 'react';
import { ICompaniesDropdownProps } from './ICompaniesDropdownProps';
import CompaniesService from '../../../../services/Companies.service';
import { Company } from '../../../../models/Company.model';
import { Dropdown } from '@fluentui/react-northstar';

interface ICompaniesDropdownState {
  companies: Company[];
  loaded: boolean;
  hasError: boolean;
  error?: Error;
}

export default class CompaniesDropdown extends React.Component<ICompaniesDropdownProps, ICompaniesDropdownState, {}> {
  constructor(props: ICompaniesDropdownProps) {
    super(props);
    this.state = { companies: [], loaded: false, hasError: false };
  }

  public componentDidMount() {
    const service = new CompaniesService(this.props.context, this.props.environment);

    service.getCompanies().then(companies => {
      this.setState({ companies: companies, loaded: true });
    }).catch(error => {
      this.setState({ companies: [], loaded: true, hasError: true, error: error });
    });
  }

  public render(): React.ReactElement<ICompaniesDropdownProps> {
    const items = !this.state.loaded ? [] : this.state.companies.map((item) => {
      return { key: item.id, header: item.name };
    });

    const onChange = (_: any, event: any) => {
      this.props.onChange(event.value.key);
    };

    return (
      <Dropdown items={items} placeholder="Select company" onChange={onChange.bind(this)} />
    );
  }
}
