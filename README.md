Stepwise Form
=============

Full example of modeling problems with data and functions using JavaScript / React.

### How to run

- `yarn install`
- `yarn start`

### Boiled down essentials

```js
/**
 * Modeling a step-wise form with data
 *
 * NOTE: The important thing is to be able to
 * describe any requirement with the chosen data model
 *
 * NOTE: Another important thing is conventional interfaces
 * and impedance matching. Data should just flow through the
 * functions without needing to conform to many different interfaces
 */

/**
 * Models
 */
const form = {
  title: 'My super cool stepwise form',
  steps: [],
  activeStep: 0,
}

const step = {
  type: 'normal|branch',
  title: 'This is step X',
  fields: [],
  flags: {
    isVisible: false,
  },
}

const field = {
  type: 'input|date|list|multi|checkbox',
  id: 'firstname',
  name: 'First Name | Arrival Date | Colors | ....',
  options: [],
  value: [] || '' || true|false,
  flags: {
    isRequired: true,
  },
}

/**
 * Update functions / operations (reducers)
 */
function updateFieldValue({ step, field, value }, form) {
  //... (can be conditional based on the step type)
}
function progressToNextStep(form) {
  //... (calculates and updates the state to progress to the next step)
}

/**
 * Selectors to get what you want from the data
 */
function getActiveStep(form) {
  //...
}

function getFormOutput(form) {
  //...
}

/**
 * Tests that ask questions about the data
 */
function isVisible(step) {
  //...
}

function isValid(field) {
  //...
}

function isOptional(field) {
  //...
}

/**
 * Component selectors / mappers
 */
function getFieldComponent(type) {
  const fieldComponents = {
    'text-input': TextInputField,
    'checkbox': CheckBoxField,
    'date': DatePickerField,
    'multi': MultiSelectField,
    'default': NullComponent,
  };

  return fieldComponents[type] || fieldComponents.default;
}

function getStepContainer(type) {
  const stepContainers = {
    'normal': NormalStepContainer,
    'branch': BranchStepContainer,
    'default': NullComponent,
  };

  return stepContainers[type] || stepContainers.default;
}

/**
 * Field Component (interface)
 */
const FieldComponent = class extends React.Component {
  constructor(props) {
    //...
  },

  render() {
    const { ... } = this.props;
    //...
  }
}

/**
 * Normal Step Container (React component interface)
 */
const NormalStepContainer = class extends React.Component {
  constructor(props) {
    //...
  },

  render() {
    const { fields } = this.props;

    const fieldList = fields
    .map((field) => {
      const FieldComponent = getFieldComponent(field.type);
      return <FieldComponent {...field} />
    });

    return (
      <div>
        {fieldList}
      </div>
    )
  }
}

/**
 * Branch Step Container (React component interface)
 */
const BranchStepContainer = class extends React.Component {
  constructor(props) {
    //...
  },

  render() {
    /**
     * Get all the available options and the index
     * specifying the one selected right now
     */
    const { selectedOption, options } = this.props;

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
      return <FieldComponent {...field} />
    });

    return (
      <div>
        <StepOptions options={options} />
        {fieldList}
      </div>
    )
  }
}

/**
 * Options Container (React component interface)
 */
const StepOptions = class extends React.Component {
  constructor(props) {
    //..
  }

  render() {
    const { options } = this.props;
    return (
      //... radio button select or something
    );
  }
}

/**
 * Form Container (React component interface)
 */
const Form = class extends React.Component {
  constructor(props) {
    //...
  }

  render() {
    const { steps } = this.props;

    const stepList = steps
    .map((step) => {
      const StepContainer = getStepContainer(step.type);
      return <StepContainer {...step} />
    });

    return (
      <div>
        {stepList}
      </div>
    )
  }
}

/**
 * App Container (React component interface)
 */
const App = class extends React.Component {
  constructor() {
    //...
  }

  render() {
    const { form } = this.props;

    return (
      <div>
        <h1>Amazing Title</h1>
        <Form {...form} />
      </div>
    )
  }
}

/**
 * Rendering app with data as props
 */
ReactDOM.render(<App form={form} />, 'root');

/**
 * You can now use data as a declarative interface for rendering
 * a multi-step form with different types of fields
 */

/**
 * What about handlers and interacting with the form?
 * TODO: Step 1 - React State (reducer style)
 * TODO: Step 2 - Redux + connecting
 */

/**
 * Example state modeling a stepwise form
 */
const initialState = {
  title: 'My super cool breakfast ordering form wizard',
  activeStep: 0,
  steps: [{
    type: 'normal',
    title: 'Step 1 - Who are you?',
    fields: [{
      type: 'text',
      id: 'firstname',
      name: 'firstname',
      label: 'First Name:',
      placeholder: 'John',
      value: '',
    }, {
      type: 'text',
      id: 'lastname',
      name: 'lastname',
      label: 'Last Name:',
      placeholder: 'Doe',
      value: '',
    }],
  }, {
    type: 'normal',
    title: 'Step 2 - What would you like for your breakfast?',
    fields: [{
      type: 'checkbox',
      id: 'coffee',
      name: 'coffee',
      label: 'I want coffee:',
      value: false,
    }, {
      type: 'checkbox',
      id: 'bagels',
      name: 'bagels',
      label: 'I want bagels:',
      value: false,
    }, {
      type: 'checkbox',
      id: 'fruit',
      name: 'fruit',
      label: 'I want fruit:',
      value: false,
    }],
  }, {
    type: 'branch',
    title: 'Step 3 - How would you like to pay?',
    selectedOption: 0,
    options: [{
      id: 'visa',
      label: 'VISA / MasterCard',
      fields: [{
        type: 'text',
        id: 'cardnumber',
        name: 'cardnumber',
        label: 'Card number:',
        placeholder: '1234-1234-1234-1234',
        value: '',
      }, {
        type: 'text',
        id: 'cvc',
        name: 'cvc',
        label: 'CVC security number:',
        placeholder: '123',
        value: '',
      }, {
        type: 'select',
        id: 'expiry',
        name: 'expiry',
        options: ['2017', '2018', '2019', '2020', '2021'],
        label: 'Expiry date:',
        value: '',
      }],
    }, {
      id: 'paypal',
      label: 'PayPal',
      fields: [{
        type: 'text',
        id: 'email',
        name: 'email',
        label: 'PayPal email:',
        placeholder: 'yourname@email.com',
        value: '',
      }],
    }],
  }],
};

/**
 * The important question - can you describe any situation necessary with this data model?
 * - data / selectors
 * - operations
 *
 * NOTE: If yes - then it is trivial to visualize (with React), as you only need to hook it up
 * to components that render based on props and attach event handlers for performing operations.
 *
 * NOTE: If no - back to the drawing board. There is no way you will be able to create something
 * cohesive if you aren't able to describe it with the data model.
 *
 * NOTE: How you choose to visualize the state is completely up to you
 * - Can show all steps at once as an accordion
 * - Can show just a single step at the time (why not let the use choose?)
 * - It's just a matter of mapping the data into UI the way you want
 */

/**
 * Further: normalized vs. denormalized data (nested embedded vs. flat referenced)
 */

/**
 * Step 1: Create a data model that can describe any state your problem can be in
 * Step 2: Create a UI where you describe what the application looks like for any possible state
 */

/**
 * NOTE: Choose duplication over the wrong abstraction
 *
 * Example:
 *
 * You could have merged NormalStepContainer and BranchStepContainer
 * and added some conditional logic, but that will make the component
 * a lot more complex and coupled. What if you end up having a lot of
 * different step types? It is better to have separate versions,
 * even if they might appear similar in the beginning.
 */

/**
 * What about loading async values for a field (f.ex a selectfield)
 *
 * NOTE: You could specify a source and use something like react-select
 * or create a component that will asynchronously fetch the options that
 * you can choose from, which when chosen will synchronously update the state
 */

/**
 * Validation
 */
function getValidator(type) {
  /**
   * Here you could build specific validator functions
   * using an existing validation library (preferrably declarative, like joi)
   */
  const validators = {
    'email': (options) => (email) => /* ... */,
    'text': (options) => (text) => /* ... */,
    default: (options) => () => true,
  };

  return validators[type] || validators.default;
}

const initialState = {
  title: 'My super cool breakfast ordering form wizard',
  activeStep: 0,
  steps: [{
    type: 'normal',
    title: 'Please give us your money',
    fields: [{
      id: 'paypal',
      label: 'PayPal',
      fields: [{
        type: 'text',
        id: 'email',
        name: 'email',
        label: 'PayPal email:',
        placeholder: 'yourname@email.com',
        value: '',
        flags: {
          isRequired: true
        },
        validation: [{
          type: 'email'
        }],
      }],
    }],
  }],
};

/**
 * Next step: being able to interact with the form to update field values
 */
function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD_VALUE':
      return state;
    default:
      return state;
  }
}

function updateField({ step, id, value }) {
  return {
    type: 'UPDATE_FIELD_VALUE',
    step,
    id,
    value,
  };
}

/**
 * Next step: being able to submit the form
 */
function getFieldsSelector(type) {
  const fieldsSelectors = {
    normal: ({ fields }) => {
      return fields.map(({ id, name, value }) => ({ id, name, value });
    },
    branch: ({ selectedOption, options }) => {
      const { fields } = options[selectedOption];
      return fields.map(({ id, name, value }) => ({ id, name, value }));
    },
    default: () => [],
  };

  return fieldsSelectors[type] || fieldsSelectors.default;
}

function getFormOutput(form) {
  const { steps } = form;

  return steps.map((step) => {
    const getFields = getFieldsSelector(step.type);
    return getFields(step);
  })
  .reduce((result, fields) => result.concat(fields), []);
}

/**
 * Next step: being able to connect to async data sources
 */
```
