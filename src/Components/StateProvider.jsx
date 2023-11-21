import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext()

export const StateProvider = ({Reducer, initialState, children }) =>(
    <StateContext.Provider value={useReducer(Reducer, initialState)}>
        {children}
    </StateContext.Provider>
)

export const UseStateValue = () => useContext(StateContext)