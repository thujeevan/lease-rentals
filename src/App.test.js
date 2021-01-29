import { render, screen } from '@testing-library/react';
import App from './App';
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

describe("App", () => {
  test('renders Current leases section', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
    const title = screen.getByText(/Current Leases/i);
    expect(title).toBeInTheDocument();
  });
});

