import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App integration tests', () => {
  it('renders the logo, message and link, and clicking the link opens a new tab', () => {
    render(<App />);

    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();

    const message = screen.getByText('Hello KrispyKopters!');
    expect(message).toBeInTheDocument();

    const link = screen.getByRole('link', { name: 'Learn React' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://reactjs.org');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');

    fireEvent.click(link);

    expect(window.open).toHaveBeenCalledWith(
      'https://reactjs.org',
      '_blank',
      'noopener,noreferrer'
    );
  });
});
