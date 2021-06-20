import usersReducer, {
    actions, InitialState
} from "./users-reducer";


let state: InitialState = {
    users: [
        {id: 1, name: 'Bob', status: 'i am', photos: {small: null, large: null}, followed: true},
        {id: 2, name: 'Alex', status: 'i am', photos: {small: null, large: null}, followed: false},
        {id: 3, name: 'Maik', status: 'i am', photos: {small: null, large: null}, followed: true}
    ],
    pageSize: 0,
    totalUsersCounts: 0,
    currentPage: 0,
    isFetching: false,
    followingIsProgress: [],
    filter: {
        term: '',
        friend: null as null | boolean
    }
}


test('follow users', () => {
    let action = actions.followSuccess(2)

    let newState = usersReducer(state, action)
    expect(newState.users[1].followed).toBe(true)
})
test('current page', () => {
    let action = actions.setCurrentPage(2)

    let newState = usersReducer(state, action)
    expect(newState.currentPage).toBe(2)
})
