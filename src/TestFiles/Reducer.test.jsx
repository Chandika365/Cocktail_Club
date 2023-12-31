import Reducer, { initialState, getFavoriteTotal } from '../Components/Reducer';

describe('Reducer Function', () => {
  it('adds an item to favorites', () => {
    const newItem = {
      id: '123',
      title: 'Mocktail',
      price: '10.99',
    };
    const action = {
      type: 'ADD_TO_FAVORITE',
      item: newItem,
    };
    const updatedState = Reducer(initialState, action);
    expect(updatedState.favorite).toHaveLength(1);
    expect(updatedState.favorite[0]).toEqual(newItem);
  });

  it('removes an item from favorites', () => {
    const mockState = {
      favorite: [
        { id: '1', title: 'Mojito', price: '8.99' },
        { id: '2', title: 'Cosmopolitan', price: '9.49' },
      ],
    };
    const action = {
      type: 'REMOVE_FROM_FAVORITE',
      id: '1',
    };
    const updatedState = Reducer(mockState, action);
    expect(updatedState.favorite).toHaveLength(1);
    expect(updatedState.favorite[0].id).toEqual('2');
  });

  it('returns default state for unknown action', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
    };
    const updatedState = Reducer(initialState, action);
    expect(updatedState).toEqual(initialState);
  });

  it('computes total price of favorite items', () => {
    const mockFavorite = [
      { id: '1', title: 'Mojito', price: '8.99' },
      { id: '2', title: 'Cosmopolitan', price: '9.49' },
    ];
    const total = getFavoriteTotal(mockFavorite);
    expect(total).toBeCloseTo(18.48); // Assuming correct calculation logic
  });
});
