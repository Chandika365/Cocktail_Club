import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FavoriteCocktail from '../Components/FavoriteCocktail';
import { StateProvider } from '../Components/StateProvider'; 

describe('FavoriteCocktail Component', () => {
  const mockCocktailData = {
    id: 1,
    image: 'image_url',
    title: 'Mojito',
    category: 'Cocktail',
    price: 9.99,
    rating: 3,
  };

  it('renders FavoriteCocktail component without crashing', () => {
    render(< FavoriteCocktail {...mockCocktailData} />, { wrapper: StateProvider });
  });

  it('displays cocktail details correctly', () => {
    render(< FavoriteCocktail {...mockCocktailData} />, { wrapper: StateProvider });

    expect(screen.getByText('Mojito')).toBeInTheDocument();
    expect(screen.getByText('Cocktail')).toBeInTheDocument();
    expect(screen.getByText('$ 9.99')).toBeInTheDocument();
    expect(screen.getAllByText('🌟')).toHaveLength(3); // Assuming a rating of 3
  });

  it('calls removeFromFavorite function when remove button is clicked', () => {
    const mockDispatch = jest.fn();
    jest.mock('./StateProvider', () => ({
      useStateValue: () => [{}, mockDispatch],
    }));

    render(< FavoriteCocktail {...mockCocktailData} />, { wrapper: StateProvider });

    const removeButton = screen.getByRole('button', { name: 'Remove From Favorite' });
    fireEvent.click(removeButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'REMOVE_FROM_FAVORITE',
      id: 1,
    });
  });

});
