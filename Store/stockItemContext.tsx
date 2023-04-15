import React, { Dispatch, createContext, useReducer } from 'react';
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
  stockItems: [
    {stockCode: 'bobla', quantity: 1, id: 0},
    {stockCode: 'joblin', quantity: 4, id: 1},
    {stockCode: 'henry', quantity: 7, id: 2},
    {stockCode: 'siddy', quantity: 1, id: 3},
    {stockCode: 'marley', quantity: 2, id: 4},
    {stockCode: 'nicky', quantity: 14, id: 5},
    {stockCode: 'bobby', quantity: 1, id: 6},
    {stockCode: 'jobby', quantity: 4, id: 7},
    {stockCode: 'henry', quantity: 7, id: 8},
    {stockCode: 'siden', quantity: 1, id: 9},
  ]
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