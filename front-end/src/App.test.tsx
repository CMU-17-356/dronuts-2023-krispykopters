import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import fetchMock from 'jest-fetch-mock';

test('renders glazed donut', async () => {
  // Mocking the API call
  fetchMock.mockResponse(JSON.stringify([{ id: 1, name: 'glazed donut' }]));

  render(<App />);

  // Wait for the API call to complete
  await screen.findByText('glazed donut');

  // Now we can make our assertions
  const textElement = screen.getByText('glazed donut');
  expect(textElement).toBeInTheDocument();
});

