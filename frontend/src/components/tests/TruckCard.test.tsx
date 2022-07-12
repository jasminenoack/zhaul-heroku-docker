import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {TruckCard} from '../TruckCard';

test('Renders truck information', () => {
  render(<TruckCard name="John" pricePerHour="19.50" type="van" id={4}/>);
  expect(screen.getByText(/Van: John/)).toBeInTheDocument();
  expect(screen.getByText('Price: $19.50')).toBeInTheDocument();
})
