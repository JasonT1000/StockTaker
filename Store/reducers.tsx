type ActionMap<M extends { [index: string]: any}> = {
    [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
    }
    : {
        type: Key
        payload: M[Key]
    }
}

export enum Types {
    Add = 'ADD_STOCKITEM',
    Delete = 'DELETE_STOCKITEM',
    Update = 'UPDATE_STOCKITEM',
}

type StockItem = {
    stockCode:string
    quantity:number
    id:number
}

type StockItemPayload = {
    [Types.Add] : {
        stockCode: string
        quantity: number
        id: number
    },
    [Types.Update] : {
        quantity: number
        id: number
    },
    [Types.Delete] : {
        id:number
    }
}

export type StockItemActions = ActionMap<StockItemPayload>[keyof ActionMap<StockItemPayload>]

export const stockItemReducer = (state: StockItem[], action: StockItemActions) => {
    switch (action.type){
        case Types.Add:
            return addStockItem(state, action.payload.stockCode)
            
        case Types.Update:
            return updateStockItem(state, action.payload.id, action.payload.quantity)

        case Types.Delete:
            return [
            ...state.filter(stockItem => stockItem.id !== action.payload.id),
            ]
        default:
            return state
    }
  }

  // Adds a stock item to the state store. If the item doesnt exist it sets its quantity to 1
  // otherwise it adds one to an items existing quantity.
  const addStockItem = (state: StockItem[], newStockCode:string) => {
    let index = state.findIndex(stockItems => stockItems.stockCode === newStockCode)
    if(index == -1){ // Item NOT in the stockItems
    return([...state, {stockCode: newStockCode, quantity: 1, id: (Math.max(...state.map((item) => item.id))+1)}])
    // SetInputText('')
    }
    else{ // Add 1 to the existing stockItems quantity
    const newArray = state.map((item) => {
        if (item.stockCode === newStockCode) {
        return { ...item, stockCode: item.stockCode, quantity: (item.quantity+1), id: item.id };
        }
        return item;
    });
    
    return(newArray);
    }
  }

  // Updates an existing stock item with the passed in quantity.
  const updateStockItem = (state: StockItem[], id:number, newQuantity:number) => {
    console.log("Updated an item")
    let index = state.findIndex(stockItems => stockItems.id === id)
    let newArray = [...state];
    newArray[index].quantity = newQuantity;
    
    return newArray
  }