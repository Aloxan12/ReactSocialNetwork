import React from "react";
import {connect} from "react-redux";
import {
    toggleFollowingIsProgress,
    InitialStateUsersType,
    setCurrentPage,
    getUsers, follow, unfollow, UserType,
} from "../../redux/users-reducer";
import {RootReduxStateType} from "../../redux/redux-store";
import {Users} from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPageSelector,
    getFollowingIsProgressSelector,
    getIsFetchingSelector,
    getPageSizeSelector, getTotalUsersCountsSelector,
    getUsersSelector
} from "../../redux/users-selectors";


export type MapStateToPropsType = {
    users:Array<UserType>
    pageSize: number
    totalUsersCounts: number
    currentPage: number
    isFetching: boolean
    followingIsProgress: Array<number>
}
export type MapDispatchToPropsType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setCurrentPage: (pageNumber: number) => void
    toggleFollowingIsProgress: (isFetching: boolean, userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
    onPageChanged: (pageNumber: number) => void
}
export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType

class UsersAPIComponent extends React.Component<UsersPropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users totalUsersCounts={this.props.totalUsersCounts}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       users={this.props.users}
                       onPageChanged={this.onPageChanged}
                       unfollow={this.props.unfollow}
                       follow={this.props.follow}
                       toggleFollowingIsProgress={this.props.toggleFollowingIsProgress}
                       followingIsProgress={this.props.followingIsProgress}
                       getUsers={this.props.getUsers}
                       isFetching={this.props.isFetching}
                       setCurrentPage={this.props.setCurrentPage}
                />
            </>
        )
    }

}

// const mapStateToProps = (state: RootReduxStateType): MapStateToPropsType => {
//     return {
//         usersPage: state.users,
//         pageSize: state.users.pageSize,
//         totalUsersCounts: state.users.totalUsersCounts,
//         currentPage: state.users.currentPage,
//         isFetching: state.users.isFetching,
//         followingIsProgress: state.users.followingIsProgress
//     }
// }
const mapStateToProps = (state: RootReduxStateType): MapStateToPropsType => {
    return {
        users:getUsersSelector(state),
        pageSize: getPageSizeSelector(state),
        totalUsersCounts: getTotalUsersCountsSelector(state),
        currentPage: getCurrentPageSelector(state),
        isFetching:getIsFetchingSelector(state),
        followingIsProgress: getFollowingIsProgressSelector(state)
    }
}


export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        follow,
        unfollow,
        setCurrentPage,
        toggleFollowingIsProgress,
        getUsers,
    })
)
(UsersAPIComponent)