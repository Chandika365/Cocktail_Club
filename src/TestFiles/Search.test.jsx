import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Search from '../Components/Search';
import { StateProvider } from '../Components/StateProvider'; 

describe('Search Component', () => {
  it('updates search term on input change', () => {
    render(<Search />, { wrapper: StateProvider });
    const searchInput = screen.getByPlaceholderText('Search Cocktails...');
    fireEvent.change(searchInput, { target: { value: 'Mojito' } });
    expect(searchInput.value).toBe('Mojito');
  });

  it('triggers search function on button click and renders search results', async () => {
    render(<Search />, { wrapper: StateProvider });
    const searchInput = screen.getByPlaceholderText('Search Cocktails...');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(searchInput, { target: { value: 'Mojito' } });
    fireEvent.click(searchButton);

    // Simulate a successful API response
    await waitFor(() => {
      expect(screen.getByText('Mojito')).toBeInTheDocument();
      expect(screen.queryByText('Sorry , your item is not available right now.')).not.toBeInTheDocument();
    });
  });

  it('displays error message for empty search term', async () => {
    render(<Search />, { wrapper: StateProvider });
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.click(searchButton);

    // Ensure error message is displayed for empty search term
    await waitFor(() => {
      expect(screen.getByText('Please enter a search term')).toBeInTheDocument();
    });
  });

  it('displays error message for failed API call', async () => {
    render(<Search />, { wrapper: StateProvider });
    const searchInput = screen.getByPlaceholderText('Search Cocktails...');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(searchInput, { target: { value: 'InvalidSearchTerm' } });
    fireEvent.click(searchButton);

    // Simulate a failed API response
    await waitFor(() => {
      expect(screen.queryByText('Sorry , your item is not available right now.')).toBeInTheDocument();
    });
  });

  it('renders star ratings correctly', () => {
    render(<Search />, { wrapper: StateProvider });
    const searchInput = screen.getByPlaceholderText('Search Cocktails...');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(searchInput, { target: { value: 'Mojito' } });
    fireEvent.click(searchButton);

    // Assuming the rating renders based on the API response
    expect(screen.getAllByText('🌟')).toHaveLength(3); // Assuming 3 stars for 'Mojito'
  });

});
