import React from 'react';
import {render, screen} from '@testing-library/react';
import {About} from "../About";

test('About', () => {
  render(<About/>);

  expect(screen.getByText(/Who are we?/)).toBeInTheDocument();
})
