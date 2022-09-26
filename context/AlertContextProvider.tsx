import { createContext, useReducer, useMemo, useEffect } from "react"
import { Alert, Slide, SlideProps, Snackbar } from '@mui/material';

type IMessageState = { message: string, open: boolean, type: 'error' | 'success' | 'info' };
type IMessageAction = { type: 'success', message: string } | { type: 'error', message: string } | { type: 'stop' } | { type: 'info', message: string }

const initValues: IMessageState = {
    message: '',
    open: false,
    type: 'success'
}

function MessageReducer(state: IMessageState, action: IMessageAction): IMessageState {

    switch (action.type) {
        case 'stop':
            return initValues;
        case 'info':
            return { message: action.message, open: true, type: 'info' };
        case 'success':
            return { message: action.message, open: true, type: 'success' };
        case 'error':
            return { message: action.message, open: true, type: 'error' };
        default:
            return state;
    }
}

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
}

export const MessageContext = createContext<{ alertState: IMessageState, alertDispatch: React.Dispatch<IMessageAction> } | undefined>(undefined)

export default function AlertContextProvider({ children }: { children: React.ReactNode }) {
    const [alertState, alertDispatch] = useReducer(MessageReducer, initValues);
    const value = useMemo(() => ({ alertState, alertDispatch }), [alertState, alertDispatch])

    const time = () => setTimeout(() => {
        if (alertState.open)
            alertDispatch({ type: 'stop' });
    }, 2000);

    useEffect(() => {
        time();
    })

    return (
        <MessageContext.Provider value={value}>
            <Snackbar
                open={alertState.open}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                TransitionComponent={SlideTransition}
            >
                <Alert severity={alertState.type}>{alertState.message}</Alert>
            </Snackbar>
            {children}
        </MessageContext.Provider>
    )


}