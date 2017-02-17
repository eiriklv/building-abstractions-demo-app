/**
 * Import dependencies
 */
import React, { Component } from 'react';

/**
 * Import sub-components
 */
import { getStepContainer } from './StepContainer';

/**
 * Form Container (React component interface)
 */
export default class Form extends Component {
  render() {
    const { steps, title } = this.props;

    const stepList = steps
    .map((step) => {
      const StepContainer = getStepContainer(step.type);
      return <StepContainer key={step.id} {...step} />;
    });

    return (
      <div>
        <h1>{title}</h1>
        {stepList}
      </div>
    )
  }
}
