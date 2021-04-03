import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {followAC, InitialStateUsersType, setUsersAC, unfollowAC, usersType} from "../../redux/users-reducer";
import {Dispatch} from "redux";
import {RootReduxStateType, StoreReduxType} from "../../redux/redux-store";
import UsersC from "./UsersС";


export type MapStateToPropsType = {
    usersPage: InitialStateUsersType
}
export type MapDispatchToPropsType = {
    follow: (userID: string) => void
    unfollow: (userID: string) =>void
    setUsers: (users: Array<any>)=>void
}
export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: RootReduxStateType): MapStateToPropsType => {
    return {
        usersPage: state.users
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        follow: (userID: string) => {
            dispatch(followAC(userID))
        },
        unfollow: (userID: string) => {
            dispatch(unfollowAC(userID))
        },
        setUsers: (users: Array<any>) => {
            dispatch(setUsersAC(users))
        }
    }
}
const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersC)

export default UsersContainer