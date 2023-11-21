import { render, fireEvent, waitFor } from '@testing-library/react';
import Cocktail from './Cocktail';

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

describe('Cocktail Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('fetches data and renders cocktail details', async () => {
    render(< Cocktail />);
    await waitFor(() => expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/random.php'));
    // Add more assertions to check if fetched data is rendered correctly
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    // Ensure cocktail details are rendered after loading
    expect(screen.getByText('Mocktail')).toBeInTheDocument();
    // Add more assertions for other cocktail details
  });

  it('handles errors during data fetching', async () => {
    fetch.mockImplementationOnce(() => Promise.reject('API is down'));
    render(<Cocktail />);
    await waitFor(() => expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/random.php'));
    expect(screen.getByText('Error Fetching Cocktails')).toBeInTheDocument();
    // Add more error handling assertions
  });

  it('adds a cocktail to favorites on button click', async () => {
    const { getByText } = render(<Cocktail />);
    await waitFor(() => expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/random.php'));
    fireEvent.click(getByText('Add To Favorite'));
    // Add assertions to check if the cocktail is added to favorites
  });

  it('displays loading message initially', () => {
    const { getByText } = render(<Cocktail />);
    expect(getByText('Loading...')).toBeInTheDocument();
    // Add more assertions related to the initial loading state
  });

  it('generates random rating within the specified range', () => {
    const randomRating = getRandomRating();
    expect(randomRating).toBeGreaterThanOrEqual(1);
    expect(randomRating).toBeLessThanOrEqual(4);
  });

  it('generates random price within the specified range', () => {
    const randomPrice = getRandomPrice();
    expect(randomPrice).toBeGreaterThanOrEqual(25);
    expect(randomPrice).toBeLessThanOrEqual(50);
  });
});
