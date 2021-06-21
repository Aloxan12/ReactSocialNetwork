import React from "react";
import {Users} from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import {useSelector} from "react-redux";
import {getIsFetchingSelector} from "../../redux/users-selectors";


type UsersPagePropsType = {
    pageTitle: string
}

export const UsersContainer: React.FC<UsersPagePropsType> = (props) => {
    const isFetching = useSelector(getIsFetchingSelector)
    return <>
        <h2>{props.pageTitle}</h2>
        {isFetching ? <Preloader/> : null}
        <Users />
    </>
}