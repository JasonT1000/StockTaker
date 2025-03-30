import { createContext, Dispatch, useMemo, useReducer } from "react";

type InitialStateType = {
    serverIpAddress: string
}

const initialState = {
    serverIpAddress: ''
}

const SettingsActionContext = createContext<{
    stateSettingsAction: InitialStateType
    dispatchSettingsAction: Dispatch<settingsActionActions>
}>({
    stateSettingsAction: initialState,
    dispatchSettingsAction: () => {
        throw new Error("dispatchSettingsAction was called outside of its Provider!");
    }
})

const AppProvider2 = ({ children }:{ children:React.ReactNode}) => {
    const [stateSettingsAction, dispatchSettingsAction] = useReducer(settingsActionReducer, initialState)

    const contexValue = useMemo(() => ({
        stateSettingsAction,
        dispatchSettingsAction,
    }), [stateSettingsAction, dispatchSettingsAction])

    return (
        <SettingsActionContext.Provider value={{stateSettingsAction, dispatchSettingsAction}}>
            { children }
        </SettingsActionContext.Provider>
    )
}

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

export enum TypesSettingsAction {
    SetServerIpAddress = 'SET_SERVERIPADDRESS'
}

type SettingsActionPayload = {
    [TypesSettingsAction.SetServerIpAddress] : {
        ipAddress: string
    }
}

export type settingsActionActions = ActionMap<SettingsActionPayload>[keyof ActionMap<SettingsActionPayload>]

const settingsActionReducer = (stateSettingsAction: InitialStateType, action: settingsActionActions): InitialStateType => {
    let newState = { ...stateSettingsAction }

    switch (action.type) {
        case TypesSettingsAction.SetServerIpAddress:
            if(action.payload?.ipAddress){
                newState.serverIpAddress = action.payload.ipAddress
            }
            else{
                console.error("invalid payload for SetServerIpAddress action")
            }
            break;
    
        default:
            return stateSettingsAction
    }

    return newState
}

// Usage: Wrap your components with <AppProvider2> to access context
export { SettingsActionContext, AppProvider2 }