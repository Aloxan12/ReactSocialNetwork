import React from "react";
import {connect} from "react-redux";
import {
    followAC,
    InitialStateUsersType,
    setCurrentPageAC, setTotalUsersCountAC,
    setUsersAC, toggleIsFetchingAC,
    unfollowAC,
} from "../../redux/users-reducer";
import {Dispatch} from "redux";
import {RootReduxStateType} from "../../redux/redux-store";
import * as axios from "axios";
import {Users} from "./Users";
import preloader from './../../assets/images/loader.gif'


export type MapStateToPropsType = {
    usersPage: InitialStateUsersType
    pageSize: number
    totalUsersCounts: number
    currentPage: number
    isFetching: boolean
}
export type MapDispatchToPropsType = {
    follow: (userID: string) => void
    unfollow: (userID: string) => void
    setUsers: (users: Array<any>) => void
    setCurrentPageAC: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
    toggleIsFetching:(isFetching: boolean)=> void
}
export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType

class UsersAPIComponent extends React.Component<UsersPropsType> {

    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.default.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPageAC(pageNumber)
        this.props.toggleIsFetching(true)
        axios.default.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
            });
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <img src={preloader}/> : null}
                <Users totalUsersCounts={this.props.totalUsersCounts}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       users={this.props.usersPage.users}
                       onPageChanged={this.onPageChanged}
                       unfollow={this.props.unfollow}
                       follow={this.props.follow}
                />
            </>
        )
    }

}

const mapStateToProps = (state: RootReduxStateType): MapStateToPropsType => {
    return {
        usersPage: state.users,
        pageSize: state.users.pageSize,
        totalUsersCounts: state.users.totalUsersCounts,
        currentPage: state.users.currentPage,
        isFetching: state.users.isFetching,
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
        },
        setCurrentPageAC: (pageNumber: number) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUsersCount: (totalCount: number) => {
            dispatch(setTotalUsersCountAC(totalCount))
        },
        toggleIsFetching: (isFetching: boolean)=> {
            dispatch(toggleIsFetchingAC(isFetching))
        }
    }
}
const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPIComponent)

export default UsersContainer