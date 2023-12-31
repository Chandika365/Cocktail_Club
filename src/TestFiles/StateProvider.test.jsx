import React from 'react';
import { render } from '@testing-library/react';
import { StateProvider, StateContext, useStateValue } from '../Components/StateProvider';

// Test 1: Context Creation
test('StateContext is created successfully', () => {
    expect(StateContext).toBeDefined();
});

// Test 2: State Provider Functionality
test('StateProvider sets initial state and provides access to state and dispatch functions', () => {
    const initialState = { count: 0 }; // Example initial state
    const reducer = (state, action) => {
        switch (action.type) {
            case 'INCREMENT':
                return { ...state, count: state.count + 1 };
            default:
                return state;
        }
    };

    const TestComponent = () => {
        const [state, dispatch] = useStateValue();
        return (
            <>
                <span data-testid="count">{state.count}</span>
                <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
            </>
        );
    };

    const { getByTestId, getByText } = render(
        <StateProvider Reducer={reducer} initialState={initialState}>
            <TestComponent />
        </StateProvider>
    );

    const countElement = getByTestId('count');
    const incrementButton = getByText('Increment');

    expect(countElement.textContent).toBe('0'); // Initial state check

    // Dispatch an action and check if state updates
    fireEvent.click(incrementButton);
    expect(countElement.textContent).toBe('1'); // State should update after dispatch
});

// Test 3: State Access using useStateValue
test('useStateValue correctly retrieves state and dispatch functions from context', () => {
    // Mock context values
    const mockState = { count: 5 };
    const mockDispatch = jest.fn();

    // Mock a functional component that uses useStateValue
    const TestComponent = () => {
        const [state, dispatch] = useStateValue();
        return (
            <div>
                <span data-testid="count">{state.count}</span>
                <button onClick={dispatch}>Dispatch</button>
            </div>
        );
    };

    const { getByTestId, getByText } = render(
        <StateContext.Provider value={[mockState, mockDispatch]}>
            <TestComponent />
        </StateContext.Provider>
    );

    const countElement = getByTestId('count');
    const dispatchButton = getByText('Dispatch');

    expect(countElement.textContent).toBe('5'); // Ensure state is retrieved from the context

    // Ensure dispatch function is being called
    fireEvent.click(dispatchButton);
    expect(mockDispatch).toHaveBeenCalled();
});
