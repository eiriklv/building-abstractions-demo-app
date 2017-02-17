/**
 * Import dependencies
 */
import React, { Component } from 'react';

/**
 * Import sub-components
 */
import FormContainer from './FormContainer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        title: 'My super cool breakfast ordering form wizard',
        activeStep: 0,
        steps: [{
          id: 'step-1',
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
          id: 'step-2',
          type: 'normal',
          title: 'Step 2 - What\'s your favorite...?',
          fields: [{
            type: 'async-select',
            id: 'flowers',
            name: 'flowers',
            source: 'flowers',
            label: 'Flowers:',
            value: '',
          }, {
            type: 'async-select',
            id: 'car',
            name: 'car',
            source: 'cars',
            label: 'Car:',
            value: '',
          }],
        }, {
          id: 'step-3',
          type: 'normal',
          title: 'Step 3 - What would you like for your breakfast?',
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
          id: 'step-4',
          type: 'branch',
          title: 'Step 4 - How would you like to pay?',
          selectedOption: 0,
          options: [{
            value: 'visa',
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
              options: [{
                label: '2017',
                value: '2017'
              }, {
                label: '2018',
                value: '2018'
              }, {
                label: '2019',
                value: '2019'
              }],
              label: 'Expiry date:',
              value: '',
            }],
          }, {
            value: 'paypal',
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
      },
    };
  }

  render() {
    const { form } = this.state;

    return (
      <FormContainer {...form} />
    );
  }
}

export default App;
