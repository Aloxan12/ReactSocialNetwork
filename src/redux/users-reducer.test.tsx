
import usersReducer, {
    followSuccess,
    InitialStateUsersType,
    PhotosType,
    setCurrentPage,
    UserType
} from "./users-reducer";


let state:InitialStateUsersType =  {
    users: [
        {id: 1,name: 'Bob', status: 'i am',photos: {small: null,large: null},followed: true},
        {id: 2,name: 'Alex', status: 'i am',photos: {small: null,large: null},followed: false},
        {id: 3,name: 'Maik', status: 'i am',photos: {small: null,large: null},followed: true}
    ],
        pageSize: 0,
totalUsersCounts: 0,
currentPage: 0,
isFetching: false,
followingIsProgress: []
}


test('follow users',()=>{
    let action = followSuccess(2)

    let newState = usersReducer(state, action)
    expect(newState.users[1].followed).toBe(true)
})
test('current page',()=>{
    let action = setCurrentPage(2)

    let newState = usersReducer(state, action)
    expect(newState.currentPage).toBe(2)
})
