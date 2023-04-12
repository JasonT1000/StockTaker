import React, { Dispatch, FC, createContext, useReducer } from 'react';
import { StockItemActions, stockItemReducer } from './reducers';

type StockItem = {
  stockCode:string
  quantity:number
  id:number
}

type InitialStateType = {
  stockItems: StockItem[]
}

const initialState = {
  stockItems: []
}

const AppContext = createContext<{
  state: InitialStateType
  dispatch: Dispatch<StockItemActions>
}>({
  state: initialState,
  dispatch: () => null
})

const mainReducer = ({ stockItems }: InitialStateType, action:StockItemActions) => ({
  stockItems: stockItemReducer(stockItems, action)
})

const AppProvider = ({ children }:any) => {
  const [state, dispatch] = useReducer(mainReducer, initialState)

  return(
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }