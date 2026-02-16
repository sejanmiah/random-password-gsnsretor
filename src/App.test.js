import { render, screen } from '@testing-library/react';
import App from './App';

test('renders SejanPass title', () => {
  render(<App />);
  const linkElement = screen.getByText(/SejanPass/i);
  expect(linkElement).toBeInTheDocument();
});
