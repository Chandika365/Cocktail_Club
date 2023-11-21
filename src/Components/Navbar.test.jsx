import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Navbar from './Navbar';
import { MemoryRouter } from 'react-router-dom';

describe('Navbar Component', () => {
  it('toggles mobile menu on button click', () => {
    render(< Navbar />, { wrapper: MemoryRouter });
    const mobileMenuButton = screen.getByRole('button', { name: 'Open mobile menu' });
    
    expect(screen.queryByText('Home')).not.toBeInTheDocument(); // Menu closed initially
    fireEvent.click(mobileMenuButton); // Open menu
    expect(screen.getByText('Home')).toBeInTheDocument(); // Menu opened
  });

  it('renders navigation links correctly', () => {
    render(<Navbar />, { wrapper: MemoryRouter });
    const homeLink = screen.getByRole('link', { name: 'Home' });
    fireEvent.click(homeLink); // Redirect to Home route
    // Add assertions to test navigation to Home route
  });

  it('opens favorite cocktails link and redirects on click', () => {
    render(<Navbar />, { wrapper: MemoryRouter });
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Cocktails' });
    fireEvent.click(favoriteLink); // Redirect to Favorite route
    // Add assertions to test navigation to Favorite route
  });

  it('renders correct number of favorite cocktails in the link', () => {
    const mockStateValue = {
      favorite: [{ /* Mock favorite cocktail data */ }],
    };
    render(<Navbar />, {
      wrapper: MemoryRouter,
      initialState: { value: mockStateValue },
    });

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Cocktails' });
    expect(favoriteLink).toHaveTextContent('1'); // Assuming one favorite cocktail
  });

  it('closes mobile menu on close button click', () => {
    render(<Navbar />, { wrapper: MemoryRouter });
    const mobileMenuButton = screen.getByRole('button', { name: 'Open mobile menu' });
    fireEvent.click(mobileMenuButton); // Open menu

    const closeButton = screen.getByRole('button', { name: 'Close mobile menu' });
    fireEvent.click(closeButton); // Close menu
    expect(screen.queryByText('Home')).not.toBeInTheDocument(); // Menu closed
  });
});
