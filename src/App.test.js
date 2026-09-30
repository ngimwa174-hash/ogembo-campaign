import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the header navigation', () => {
  render(<App />);
  const headerLinks = screen.getAllByText(/home|about|agenda/i);
  expect(headerLinks.length).toBeGreaterThan(0);
});
