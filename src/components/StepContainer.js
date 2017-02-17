/**
 * Import dependencies
 */
import React, { Component } from 'react';

/**
 * Import sub-components
 */
import { getFieldComponent } from './FieldComponent';

/**
 * Normal Step Container
 */
const NormalStepContainer = class extends Component {
  render() {
    const { fields, title } = this.props;

    const fieldList = fields
    .map((field) => {
      const FieldComponent = getFieldComponent(field.type);
      return <FieldComponent key={field.id} {...field} />;
    });

    return (
      <div>
        <h2>{title}</h2>
        {fieldList}
      </div>
    )
  }
}

/**
 * Branch Step Container
 */
const BranchStepContainer = class extends Component {
  render() {
    /**
     * Get all the available options and the index
     * specifying the one selected right now
     */
    const { selectedOption, options, title } = this.props;

    /**
     * Get the field for the selected option
     */
    const { fields } = options[selectedOption];

    /**
     * Map field data into React-components
     */
    const fieldList = fields
    .map((field) => {
      const FieldComponent = getFieldComponent(field.type);
      return <FieldComponent key={field.id} {...field} />;
    });

    return (
      <div>
        <h2>{title}</h2>
        <StepOptions
          options={options}
          selectedOption={selectedOption}
        />
        {fieldList}
      </div>
    )
  }
}

/**
 * Options Container for Branch Step Container
 */
const StepOptions = class extends Component {
  render() {
    const { options, selectedOption } = this.props;
    const activeValue = options[selectedOption].value;

    const optionList = options
    .map(({ label, value }) => <option key={value} value={value}>{label}</option>);

    return (
      <label htmlFor={name}>
        <select name={name} value={activeValue} readOnly>
          {optionList}
        </select>
      </label>
    );
  }
}

/**
 * Export a mapper interface
 */
export function getStepContainer(type) {
  const stepContainers = {
    'normal': NormalStepContainer,
    'branch': BranchStepContainer,
    'default': () => null,
  };

  return stepContainers[type] || stepContainers.default;
}
