/**
 * Import dependencies
 */
import React, { Component } from 'react';
import autoBind from 'auto-bind';

/**
 * Import services
 */
import getOptions from '../services/get-options';

/**
 * Text Field Component
 */
const TextInput = class extends Component {
  render() {
    const { id, name, label, value, placeholder } = this.props;

    return (
      <div>
        <label htmlFor={name}>
          {label}
          <input type="text" name={name} value={value} placeholder={placeholder} />
        </label>
      </div>
    );
  }
}

/**
 * Checkbox Component
 */
const CheckboxInput = class extends Component {
  render() {
    const { id, name, label, value } = this.props;

    return (
      <div>
        <label htmlFor={name}>
          {label}
          <input type="checkbox" name={name} checked={value} />
        </label>
      </div>
    );
  }
}

/**
 * Select Component
 */
const SelectInput = class extends Component {
  render() {
    const { id, name, label, options, value } = this.props;

    const optionList = options
    .map(({ label, value }) => <option key={value} value={value}>{label}</option>);

    return (
      <div>
        <label htmlFor={name}>
          {label}
          <select name={name} value={value}>
            {optionList}
          </select>
        </label>
      </div>
    );
  }
}

/**
 * Async Select Component
 */
const AsyncSelectInput = class extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      isLoading: true,
      options: [],
    };
  }

  populateOptions() {
    const { source } = this.props;

    this.setState({ isLoading: true });

    getOptions(source)
    .then((options) => this.setState({ options, isLoading: false }));
  }

  componentDidMount() {
    this.populateOptions();
  }

  componentWillReceiveProps() {
    this.populateOptions();
  }

  render() {
    const { id, name, label, value, source } = this.props;
    const { options, isLoading } = this.state;

    const optionList = options
    .map(({ label, value }) => <option key={value} value={value}>{label}</option>);

    return (
      <div>
        <label htmlFor={name}>
          {label} {isLoading && 'Loading..'}
          <select disabled={isLoading} name={name} value={value}>
            {optionList}
          </select>
        </label>
      </div>
    );
  }
}

/**
 * Export a mapper interface
 */
export function getFieldComponent(type) {
  const fieldComponents = {
    'text': TextInput,
    'checkbox': CheckboxInput,
    'select': SelectInput,
    'async-select': AsyncSelectInput,
    'default': () => null,
  };

  return fieldComponents[type] || fieldComponents.default;
}
