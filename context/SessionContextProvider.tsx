import React, { createContext, useReducer } from "react";
import { ISessionStatusType } from "../interfaces/ISessionStatus";

type IState = {
    perfil: 'A' | 'U',
    token: string,
    status: ISessionStatusType
};

type IAction = { type: 'clear' } | { type: 'success', newState: IState } | { type: 'reject' }
const initValues: IState = {
    perfil: 'U',
    status: ISessionStatusType.request,
    token: ''
}

function reducer(state: IState, action: IAction): IState {
    switch (action.type) {
        case "clear":
            return { token: '', perfil: "U", status: ISessionStatusType.request }
        case "reject":
            return { perfil: 'U', status: ISessionStatusType.reject, token: '' };
        case 'success':
            return { ...action.newState, status: ISessionStatusType.success }
        default:
            return state;
    }
}

export const SessionContext = createContext<{ sessionState: IState, sessionDispatch: React.Dispatch<IAction> } | undefined>(undefined)

export default function SessionContextProvider({ children }: { children: React.ReactNode }) {

    const [sessionState, sessionDispatch] = useReducer(reducer, initValues)

    const value = ({ sessionState, sessionDispatch })

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    )

}