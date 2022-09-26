import { useContext } from "react";
import { MessageContext } from "../context/AlertContextProvider";

export function useAlert() {
    const context = useContext(MessageContext);
    if (!context)
        throw new Error(`Alert context don't provider`);
    return context;
}
