import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {TruckList} from '../TruckList';

test('Renders truck list', () => {
  const trucks = [
    {
      id: 1,
      name: 'Jesse',
      type: 'pick_up',
      pricePerHour: '15.50'
    },
    {
      id: 2,
      name: 'John',
      type: 'pick_up',
      pricePerHour: '15.50'
    },
  ]
  render(<TruckList trucks={trucks}/>);
  expect(screen.getByText(/Pick Up Truck: John/)).toBeInTheDocument()
  expect(screen.getByText(/Pick Up Truck: Jesse/)).toBeInTheDocument()
});
