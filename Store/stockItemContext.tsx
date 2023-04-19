import React, { Dispatch, createContext, useReducer } from 'react';
import { StockItemActions, stockItemReducer } from './reducers';

type StockItem = {
  stockCode:string
  quantity:number
  id:string
}

type InitialStateType = {
  stockItems: StockItem[]
}

const initialState = {
  stockItems: [
    {stockCode: 'bobla', quantity: 1, id: 'bobla'},
    {stockCode: 'joblin', quantity: 4, id: 'joblin'},
    {stockCode: 'henry', quantity: 7, id: 'henry'},
    {stockCode: 'siddy', quantity: 1, id: 'siddy'},
    {stockCode: 'marley', quantity: 2, id: 'marley'},
    {stockCode: 'nicky', quantity: 14, id: 'nicky'},
    {stockCode: 'bobby', quantity: 1, id: 'bobby'},
    {stockCode: 'jobby', quantity: 4, id: 'jobby'},
    {stockCode: 'blob', quantity: 7, id: 'blob'},
    {stockCode: 'siden', quantity: 1, id: 'siden'},
    {stockCode: 'potter', quantity: 2, id: 'potter'},
    {stockCode: 'bobbette', quantity: 1, id: 'bobbette'},
    {stockCode: 'jobette', quantity: 4, id: 'jobette'},
    {stockCode: 'james', quantity: 7, id: 'james'},
    {stockCode: 'sidney', quantity: 1, id: 'sidney'},
    {stockCode: 'bork', quantity: 2, id: 'bork'},
    {stockCode: 'tiddle', quantity: 14, id: 'tiddle'},
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