import React from 'react';
import {render, screen} from '@testing-library/react';
import {NavBar} from "../NavBar";

test('Renders nav bar', () => {
  render(<NavBar/>);
  expect(screen.getByText('Home')).toBeInTheDocument()
  expect(screen.getByText('About')).toBeInTheDocument()
});
