import React from 'react';
import { render, screen } from '@testing-library/react';
import {TruckList} from '../TruckList';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {TruckContext, TruckContextDefault} from "../../contexts/TruckContext";

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
      type: 'van',
      pricePerHour: '15.50'
    },
  ]
  const context = {
      ...TruckContextDefault,
      trucks
    }
  render(
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <TruckContext.Provider value={context}>
        <TruckList/>
      </TruckContext.Provider>
    </LocalizationProvider>
  );
  expect(screen.getByText(/John/)).toBeInTheDocument()
  expect(screen.getByText(/Pick Up Truck/)).toBeInTheDocument()
  expect(screen.getByText(/Van/)).toBeInTheDocument()
  expect(screen.getByText(/Jesse/)).toBeInTheDocument()
});
