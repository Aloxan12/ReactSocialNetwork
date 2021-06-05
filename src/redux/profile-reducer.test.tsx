import profileReducer, {addPostAC, deletePostAC, InitialStatePostType} from "./profile-reducer";


let state:InitialStatePostType = {
    posts: [
        {id: 1,message: "Hello, It is my first massage", likeCounts: 15},
        {id: 2, message: "Hello, I am Lesha", likeCounts: 30},
    ],
    profile:{
        "aboutMe": "я круто чувак 1001%",
        "contacts": {
            "facebook": "facebook.com",
            "website": '',
            "vk": "vk.com/dimych",
            "twitter": "https://twitter.com/@sdf",
            "instagram": "instagra.com/sds",
            "youtube": 'null',
            "github": "github.com",
            "mainLink": 'null'
        },
        "lookingForAJob": true,
        "lookingForAJobDescription": "не ищу, а дурачусь!!!",
        "fullName": "samurai dimych",
        "userId": 2,
        "photos": {
            "small": "https://social-network.samuraijs.com/activecontent/images/users/2/user-small.jpg?v=0",
            "large": "https://social-network.samuraijs.com/activecontent/images/users/2/user.jpg?v=0"
        }
    },
    status: ''
}


test('length of post should be increment',()=>{
    let action = addPostAC('What?')

    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(3)
})
test('delete post',()=>{
    let action = deletePostAC(2)
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(1)
})


