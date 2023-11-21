import React from 'react';
import { render, screen } from '@testing-library/react';
import Favorite from './Favorite';
import { StateProvider } from './StateProvider'; // Mock or provide a StateProvider context

describe('Favorite Component', () => {
  const mockState = {
    favorite: [
      {
        id: 1,
        title: 'Mojito',
        category: 'Cocktail',
        image: 'image_url',
        price: 9.99,
        rating: 3,
      },
    ],
  };

  it('renders Favorite component without crashing', () => {
    render(<Favorite />, { wrapper: StateProvider, initialState: mockState });
  });

  it('displays favorite cocktails correctly', () => {
    render(<Favorite />, { wrapper: StateProvider, initialState: mockState });

    expect(screen.getByText('Your Favorite Cocktails')).toBeInTheDocument();
    expect(screen.getByText('Mojito')).toBeInTheDocument();
    // Add assertions to ensure other mock favorite cocktails are rendered correctly
  });

  it('displays a message for empty favorites list', () => {
    const emptyState = { favorite: [] };
    render(<Favorite />, { wrapper: StateProvider, initialState: emptyState });

    expect(screen.getByText('No favorite cocktails yet!')).toBeInTheDocument();
  });

  it('renders Subtotal component and interacts correctly', () => {
    render(<Favorite />, { wrapper: StateProvider, initialState: mockState });

    expect(screen.getByText('Subtotal (2):')).toBeInTheDocument();
    // Test interactions or calculations related to the Subtotal component
  });

});
