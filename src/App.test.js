import { render, screen } from '@testing-library/react';
import App from './App';

test('renders password generator title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Password Gen/i);
  expect(linkElement).toBeInTheDocument();
});
