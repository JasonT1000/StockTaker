import React, { Dispatch, createContext, useReducer } from 'react';
import { StockItemActions, stockItemReducer } from './reducers';

type StockItem = {
  stockEan:string
  stockCode:string
  quantity:number
  id:string
}

type InitialStateType = {
  stockItems: StockItem[]
}

const initialState = {
  stockItems: [
    // {stockCode: 'bobla', quantity: 1, id: 'bobla'},
    // {stockCode: 'joblin', quantity: 4, id: 'joblin'},
    // {stockCode: 'henry', quantity: 7, id: 'henry'},
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