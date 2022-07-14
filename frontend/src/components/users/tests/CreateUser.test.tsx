import React from 'react';
import {render, screen} from '@testing-library/react';
import CreateUser from "../CreateUser";

test('CreateUser', () => {
  render(<CreateUser/>);

  expect(screen.getByText(/Create User/)).toBeInTheDocument();
  expect(screen.getByText(/Username/)).toBeInTheDocument();
  expect(screen.getByText(/Password/)).toBeInTheDocument();
  expect(screen.getByText(/Close/)).toBeInTheDocument();
  expect(screen.getByText(/Submit/)).toBeInTheDocument();
})
