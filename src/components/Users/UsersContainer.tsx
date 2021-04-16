import React from "react";
import {connect} from "react-redux";
import {
    follow, toggleFollowingIsProgress,
    InitialStateUsersType,
    setCurrentPage, setTotalUsersCount,
    setUsers, toggleIsFetching,
    unfollow,
} from "../../redux/users-reducer";
import {RootReduxStateType} from "../../redux/redux-store";
import {Users} from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import {UsersAPI} from "../../api/api";


export type MapStateToPropsType = {
    usersPage: InitialStateUsersType
    pageSize: number
    totalUsersCounts: number
    currentPage: number
    isFetching: boolean
    followingIsProgress: Array<number>
}
export type MapDispatchToPropsType = {
    follow: (userID: string) => void
    unfollow: (userID: string) => void
    setUsers: (users: Array<any>) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
    toggleIsFetching:(isFetching: boolean)=> void
    toggleFollowingIsProgress:(isFetching: boolean, userId: number)=> void
}
export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType

class UsersAPIComponent extends React.Component<UsersPropsType> {

    componentDidMount() {
        this.props.toggleIsFetching(true)
        UsersAPI.getUsers(this.props.currentPage,this.props.pageSize ).then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(data.totalCount)
            });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)
        UsersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
            });
    }

    render() {
        return (
            <>
                {this.props.isFetching ?<Preloader /> : null}
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
// const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
//     return {
//         follow: (userID: string) => {
//             dispatch(followAC(userID))
//         },
//         unfollow: (userID: string) => {
//             dispatch(unfollowAC(userID))
//         },
//         setUsers: (users: Array<any>) => {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (pageNumber: number) => {
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         setTotalUsersCount: (totalCount: number) => {
//             dispatch(setTotalUsersCountAC(totalCount))
//         },
//         toggleIsFetching: (isFetching: boolean)=> {
//             dispatch(toggleIsFetchingAC(isFetching))
//         }
//     }
// }


const UsersContainer = connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
    toggleFollowingIsProgress,
})(UsersAPIComponent)

export default UsersContainer