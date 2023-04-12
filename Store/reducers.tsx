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
    [Types.Delete] : {
        id:number
    }
}

export type StockItemActions = ActionMap<StockItemPayload>[keyof ActionMap<StockItemPayload>]

export const stockItemReducer = (state: StockItem[], action: StockItemActions) => {
    switch (action.type){
        case Types.Add:
            return[
            ...state,
            {
                stockCode: action.payload.stockCode,
                quantity: action.payload.quantity,
                id: action.payload.id,
            }
            ]
        case Types.Delete:
            return [
            ...state.filter(stockItem => stockItem.id !== action.payload.id),
            ]
        default:
            return state
    }
  }