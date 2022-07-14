import React from 'react';
import {render, screen} from '@testing-library/react';
import Login from "../Login";

test('CreateUser', () => {
  render(<Login/>);

  expect(screen.getByText(/Login/)).toBeInTheDocument();
  expect(screen.getByText(/Username/)).toBeInTheDocument();
  expect(screen.getByText(/Password/)).toBeInTheDocument();
  expect(screen.getByText(/Close/)).toBeInTheDocument();
  expect(screen.getByText(/Submit/)).toBeInTheDocument();
})
