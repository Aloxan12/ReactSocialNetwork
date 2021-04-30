import React from "react";
import {connect} from "react-redux";
import {
    toggleFollowingIsProgress,
    InitialStateUsersType,
    setCurrentPage,
    getUsers, follow, unfollow,
} from "../../redux/users-reducer";
import {RootReduxStateType} from "../../redux/redux-store";
import {Users} from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


export type MapStateToPropsType = {
    usersPage: InitialStateUsersType
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
                       users={this.props.usersPage.users}
                       onPageChanged={this.onPageChanged}
                       unfollow={this.props.unfollow}
                       follow={this.props.follow}
                       toggleFollowingIsProgress={this.props.toggleFollowingIsProgress}
                       followingIsProgress={this.props.followingIsProgress}
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
        followingIsProgress: state.users.followingIsProgress
    }
}
compose(
    withAuthRedirect,
    connect(mapStateToProps, {
        follow,
        unfollow,
        setCurrentPage,
        toggleFollowingIsProgress,
        getUsers,
    })
)
(UsersAPIComponent)

const UsersContainer = connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    toggleFollowingIsProgress,
    getUsers,
})(UsersAPIComponent)

export default withAuthRedirect(UsersContainer)