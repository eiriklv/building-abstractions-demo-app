/**
 * Import dependencies
 */
import request from 'axios';

/**
 * Export a function that fetches a list of options
 * to select from
 *
 * NOTE: Mock service that we can replace with an actual request
 */
export default function getOptions(source) {
  const options = {
    flowers: [{
      label: 'Dandelions',
      value: 'dandelions',
    }, {
      label: 'Roses',
      value: 'roses',
    }, {
      label: 'Tulips',
      value: 'tulips',
    }, {
      label: 'Daffodils',
      value: 'daffodils',
    }],
    cars: [{
      label: 'Porsche',
      value: 'porsche',
    }, {
      label: 'Ferrari',
      value: 'ferrari',
    }, {
      label: 'Lamborghini',
      value: 'lamborghini',
    }],
    default: [],
  }

  return new Promise((resolve) => {
    const selectedOptions = options[source] || options.default;

    setTimeout(() => {
      resolve(selectedOptions);
    }, 2000);
  })
}
