import React from 'react';
import { render, screen } from '@testing-library/react';
import {TruckFilter} from "../TruckFilter";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

test('Renders truck information', () => {
  render(<LocalizationProvider dateAdapter={AdapterMoment}><TruckFilter/></LocalizationProvider>);
  expect(screen.queryAllByText(/Truck type/)[0]).toBeInTheDocument();
  expect(screen.queryAllByText(/Start date/)[0]).toBeInTheDocument();
  expect(screen.queryAllByText(/End date/)[0]).toBeInTheDocument();
})
