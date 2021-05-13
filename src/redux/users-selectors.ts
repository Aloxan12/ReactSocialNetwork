import {RootReduxStateType} from "./redux-store";

export const getUsersSelector = (state: RootReduxStateType)=>{
    return state.users;
}
export const getPageSizeSelector = (state: RootReduxStateType)=>{
    return state.users.pageSize;
}
export const getTotalUsersCountsSelector = (state: RootReduxStateType)=>{
    return state.users.totalUsersCounts;
}
export const getCurrentPageSelector = (state: RootReduxStateType)=>{
    return state.users.currentPage;
}
export const getIsFetchingSelector = (state: RootReduxStateType)=>{
    return state.users.isFetching;
}
export const getFollowingIsProgressSelector = (state: RootReduxStateType)=>{
    return state.users.followingIsProgress;
}