import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {TruckCard} from '../TruckCard';

test('Renders truck information', () => {
  render(<TruckCard name="John" pricePerHour="19.50" type="van" id={4}/>);
  expect(screen.getByText(/John/)).toBeInTheDocument();
  expect(screen.getByText(/Van/)).toBeInTheDocument();
  expect(screen.getByText('Price per hour: $19.50')).toBeInTheDocument();
})
