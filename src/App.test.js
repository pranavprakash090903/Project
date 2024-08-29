// src/App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Spotify brand', () => {
  render(<App />);
  const brandElement = screen.getByText(/Spotify/i);
  expect(brandElement).toBeInTheDocument();
});
