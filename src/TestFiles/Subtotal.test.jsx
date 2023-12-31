import React from 'react';
import { render } from '@testing-library/react';
import Subtotal from '../Components/Subtotal';
import { StateProvider } from '../Components/StateProvider'; 

describe('Subtotal Component', () => {
  it('renders Subtotal component without crashing', () => {
    render(<Subtotal />, { wrapper: StateProvider });
  });

  it('displays correct subtotal value based on favorite items', () => {
    // Mock the favorite items
    const mockFavorite = [
      { id: 1, title: 'Cocktail A', price: 10.99 },
      { id: 2, title: 'Cocktail B', price: 15.49 },
    ];

    // Render the Subtotal component with mocked favorite items
    const { getByText } = render(<Subtotal />, {
      wrapper: StateProvider,
      initialState: { favorite: mockFavorite },
    });

    // Calculate the expected subtotal based on the mocked items
    const expectedSubtotal = mockFavorite.reduce((acc, item) => acc + item.price, 0).toFixed(2);

    // Find and assert the displayed subtotal text
    const subtotalElement = getByText(`Subtotal (${mockFavorite.length}): $ ${expectedSubtotal}`);
    expect(subtotalElement).toBeInTheDocument();
  });

  it('displays formatted currency with thousand separator', () => {
    // Mock the favorite items
    const mockFavorite = [
      { id: 1, title: 'Cocktail A', price: 1000 },
    ];

    // Render the Subtotal component with mocked favorite items
    const { getByText } = render(<Subtotal />, {
      wrapper: StateProvider,
      initialState: { favorite: mockFavorite },
    });

    // Ensure the displayed subtotal text includes the thousand separator
    const subtotalElement = getByText('Subtotal (1): $ 1,000.00');
    expect(subtotalElement).toBeInTheDocument();
  });

  it('displays zero subtotal for empty cart', () => {
    // Mock an empty favorite array
    const mockFavorite = [];

    // Render the Subtotal component with an empty favorite array
    const { getByText } = render(<Subtotal />, {
      wrapper: StateProvider,
      initialState: { favorite: mockFavorite },
    });

    // Ensure the displayed subtotal text shows 0 for an empty cart
    const subtotalElement = getByText('Subtotal (0): $ 0.00');
    expect(subtotalElement).toBeInTheDocument();
  });


});
