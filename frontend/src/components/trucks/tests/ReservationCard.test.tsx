import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {ReservationCard} from "../ReservationCard";

test('Renders truck information', () => {
  render(
    <ReservationCard
      id={6}
      truckName="James"
      truckType="van"
      totalPrice="15.00"
      startTime={new Date("2022-07-14T06:46:01.723000+02:00")}
      endTime={new Date("2022-07-14T06:46:01.723000+02:00")}
    />
  );
  expect(screen.getByText(/James/)).toBeInTheDocument();
  expect(screen.getByText(/Van/)).toBeInTheDocument();
  expect(screen.getByText(/Total cost: \$15\.00/)).toBeInTheDocument();
  expect(screen.getByText(/Start time: 7\/14\/2022, 4:46:01 AM/)).toBeInTheDocument();
  expect(screen.getByText(/End time: 7\/14\/2022, 4:46:01 AM/)).toBeInTheDocument();
})
