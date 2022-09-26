import { useContext } from "react"
import { SessionContext } from "../context/SessionContextProvider"

export function useSession() {
    const context = useContext(SessionContext);
    if (!context)
        throw new Error(`Session Context doesn\'t provider`)
    return context;
}