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
    AddManual = 'ADD_MANUAL_STOCKITEM', 
    Delete = 'DELETE_STOCKITEM',
    Update = 'UPDATE_STOCKITEM',
    Clear = 'CLEAR_STOCKITEMS'
}

export type StockItem = {
    stockEan:string
    stockCode:string
    quantity:number
    id:string
}

type StockItemPayload = {
    [Types.Add] : {
        stockEan: string
        quantity?: number
    },
    [Types.AddManual] : {
        stockEan: string
        quantity: number
    },
    [Types.Update] : {
        quantity: number
        id: string
    },
    [Types.Delete] : {
        id:string
    },
    [Types.Clear] : {
    },
}

export type StockItemActions = ActionMap<StockItemPayload>[keyof ActionMap<StockItemPayload>]

export const stockItemReducer = (state: StockItem[], action: StockItemActions) => {
    switch (action.type){
        case Types.Add:
            return addStockItem(state, action.payload)

        case Types.AddManual:
            return addManualStockItem(state, action.payload)
            
        case Types.Update:
            return updateStockItem(state, action.payload.id, action.payload.quantity)

        case Types.Delete:
            return [
            ...state.filter(stockItem => stockItem.id !== action.payload.id),
            ]
        case Types.Clear:
            return []
        default:
            return state
    }
  }

  // Adds a stock item to the state store. If the item doesnt exist it sets its quantity to 1
  // otherwise it adds one to an items existing quantity.
  const addStockItem = (state: StockItem[], payload:{stockEan:string, quantity?:number}) => {
    let index = state.findIndex(stockItems => stockItems.stockEan === payload.stockEan)
    if(index == -1){ // Item NOT in the stockItems
        return([...state, {
            stockEan: payload.stockEan,
            stockCode: '',
            quantity: payload.quantity? payload.quantity : 1,
            id: payload.stockEan,
        }])
    }
    else{ // Add 1 to the existing stockItems quantity
        const newArray = state.map((item) => {
            if (item.stockEan === payload.stockEan) {
            return { ...item,
                stockEan: item.stockEan,
                stockCode: '',
                quantity: (item.quantity + (payload.quantity? payload.quantity : 1)),
                id: item.id };
            }
            return item;
        });
    
        return(newArray);
    }
  }

  // Adds a stock item to the state store. If the item doesnt exist it sets its quantity to passed
  // in quantity otherwise it adds passed in quantity to an items existing quantity.
  const addManualStockItem = (state: StockItem[], payload:{stockEan:string, quantity:number}) => {
    let index = state.findIndex(stockItems => stockItems.stockEan === payload.stockEan)
    if(index == -1){ // Item NOT in the stockItems
        return([...state, {
            stockEan: payload.stockEan,
            stockCode: '',
            quantity: payload.quantity,
            id: payload.stockEan,
        }])
    }
    else{ // Add to the existing stockItems quantity
        const newArray = state.map((item) => {
            if (item.stockEan === payload.stockEan) {
            return { ...item,
                stockEan: item.stockEan,
                stockCode: '',
                quantity: (item.quantity + payload.quantity),
                id: item.id };
            }
            return item;
        });
    
        return(newArray);
    }
  }

  // Updates an existing stock item with the passed in quantity.
  const updateStockItem = (state: StockItem[], id:string, newQuantity:number) => {
    let index = state.findIndex(stockItems => stockItems.id === id)
    let newArray = [...state];
    newArray[index].quantity = newQuantity;
    
    return newArray
  }