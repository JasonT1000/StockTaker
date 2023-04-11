import React, { createContext, useContext, useReducer } from 'react';
import { StockItem } from '../types';

// type StockItem2{
//   stockCode:string
//   quantity:number
//   id:number
// }

const stockItemsReducer = (stockItems:any, action:any) =>{
  switch (action.type){
    case 'added':{
      return console.log('added')
    }
    case 'removed':{
      return console.log('removed')
    }
  }
}

const initialStockItems:any = [
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
    {stockCode: 'marley', quantity: 2, id: 10},
    {stockCode: 'nicky', quantity: 14, id: 11},
    {stockCode: 'bobbette', quantity: 1, id: 12},
    {stockCode: 'jobette', quantity: 4, id: 13},
    {stockCode: 'henry', quantity: 7, id: 14},
    {stockCode: 'sidney', quantity: 1, id: 15},
    {stockCode: 'marley', quantity: 2, id: 16},
    {stockCode: 'nicky', quantity: 14, id: 17},
]


export const StockItemsContext = createContext(null) as any
export const StoreDispatchContext = createContext(null)

export function StockItemProvider({ children }:any){
  const [stockItems, dispatch] = useReducer(
    stockItemsReducer,
    initialStockItems
  )

  return(
    <StockItemsContext.Provider value={stockItems}>
      <StoreDispatchContext.Provider value={dispatch}>
        {children}
      </StoreDispatchContext.Provider>
    </StockItemsContext.Provider>
  )
}

export function useStockItems() {
  const tasks = useContext(StockItemsContext)

  if (tasks === null) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return tasks;
}

export function useStockItemsDispatch(){
  return useContext(StoreDispatchContext)
}




// export const useStore = () => useContext(StoreContext)

// export const StoreProvider = ({ children }:any) => {
//   const [state, dispatch] = useReducer(reducer, initialState)

//   return (
//     <StoreContext.Provider value={{ state, dispatch }}>
//       {children}
//     </StoreContext.Provider>
//   );
// };

// 2. Define your reducer function:


// const reducer = (state:any, action:any) => {
//   switch (action.type) {
//     case 'INCREMENT':
//       return { ...state, count: state.count + 1 };
//     case 'DECREMENT':
//       return { ...state, count: state.count - 1 };
//     default:
//       return state;
//   }
// };

// 3. Wrap your app with the `StoreProvider` component:

// import { StoreProvider } from './store';

// const App = () => {
//   return (
//     <StoreProvider>
//       <YourApp />
//     </StoreProvider>
//   );
// };

// 4. Use the `useStore` hook to access your global store:


// import { useStore } from './store';

// const YourComponent = () => {
//   const { state, dispatch } = useStore();

//   const handleIncrement = () => {
//     dispatch({ type: 'INCREMENT' });
//   };

//   const handleDecrement = () => {
//     dispatch({ type: 'DECREMENT' });
//   };

//   return (
//     <View>
//       <Text>{state.count}</Text>
//       <Button title="+" onPress={handleIncrement} />
//       <Button title="-" onPress={handleDecrement} />
//     </View>
//   );
// };

// I hope this helps!

// Source: Conversation with Bing, 9/04/2023(1) Implement Redux-like Global Store With React Hooks and React ... - DZone. https://dzone.com/articles/a-new-way-to-implement-redux-like-global-store-wit Accessed 9/04/2023.
// (2) Implementing a global store using React Context and Hook ... - Medium. https://medium.com/craftsmenltd/implementing-a-global-store-using-react-context-and-hook-patterns-part-1-233368f0b2df Accessed 9/04/2023.
// (3) React Native: where to place global state variables. https://stackoverflow.com/questions/64453630/react-native-where-to-place-global-state-variables Accessed 9/04/2023.
// (4) How To Build a Redux-Like Store With React Context and Hooks. https://betterprogramming.pub/build-a-redux-like-store-with-react-context-hooks-234e3774495f Accessed 9/04/2023.