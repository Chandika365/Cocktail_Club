import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Home from './Home';

// Mocking the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        drinks: [
          {
            idDrink: '123',
            strDrink: 'Mocktail',
            strCategory: 'Mock Category',
            strDrinkThumb: 'mock-url.jpg',
          },
        ],
      }),
  })
);

describe('Home Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('fetches cocktails on component mount', async () => {
    render(< Home />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(5)); // Assuming 5 API calls based on the implementation
    // Add assertions to check if fetched data is correctly set in state and rendered
  });

  it('triggers fetchCocktails on refresh button click', async () => {
    const { getByText } = render(<Home />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(5)); // Wait for initial API calls
    fireEvent.click(getByText('Refresh'));
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(10)); // Assuming 5 additional API calls after refresh
    // Add assertions related to data refreshing
  });

  it('renders initial text elements correctly', () => {
    const { getByText } = render(<Home />);
    expect(getByText('World Best Class Cocktails')).toBeInTheDocument();
    // Add more assertions related to the initial text elements
  });

  it('renders Cocktail components with correct props', async () => {
    render(<Home />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(5));
    // Add assertions to check if Cocktail components are rendered with correct props
  });

  it('calculates random price within the specified range', () => {
    const randomPrice = Home().fetchCocktails()[0].price; // Assuming price calculation is within fetchCocktails function
    expect(randomPrice).toBeGreaterThanOrEqual(5);
    expect(randomPrice).toBeLessThanOrEqual(55); // 50 + 5 (based on Math.floor(Math.random() * 50) + 5)
  });

  it('calculates random rating within the specified range', () => {
    const randomRating = Home().fetchCocktails()[0].rating; // Assuming rating calculation is within fetchCocktails function
    expect(randomRating).toBeGreaterThanOrEqual(1);
    expect(randomRating).toBeLessThanOrEqual(4); // 4 (based on Math.floor(Math.random() * 4) + 1)
  });

  it('handles errors during data fetching', async () => {
    fetch.mockImplementationOnce(() => Promise.reject('API is down'));
    render(<Home />);
    // Add assertions related to error handling
  });
});
