import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../components/App';
import {BrowserRouter} from "react-router-dom";

test('Renders nav bar', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  expect(screen.getByText('Home')).toBeInTheDocument()
  expect(screen.getByText('About')).toBeInTheDocument()
});
