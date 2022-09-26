import { NextComponentType } from "next";
import { Router, useRouter } from "next/router";
import { ISessionStatusType } from "../interfaces/ISessionStatus";

export const withAuth = (WrapperComponent: any) => {
    const Wrapper = (props: any) => {
        console.log(props)
        return <Wrapper {...props} />
    }
    return Wrapper
}