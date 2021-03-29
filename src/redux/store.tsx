import React from "react";
// import profileReducer, {addPostActionCreate, changeNewTextCreate} from "./profile-reducer";
// import dialogsReducer, {addMessageActionCreate, changeNewMessageTextCreate} from "./dialogs-reducer";
// import navbarReducer from "./navbar-reducer";
// import {followAC, unfollowAC} from "./users-reducer";
//
// export type messageType = {
//     id: number
//     message: string
// }
// export type dialogsType = {
//     id: number
//     name: string
// }

// export type postType = {
//     id: number
//     message: string
//     likeCounts: number
// }
// export type profilePageType = {
//     posts: Array<postType>
//     newPostText: string
// }
// export type dialogsPageType = {
//     messages: Array<messageType>
//     dialogs: Array<dialogsType>
//     newMessage: string
// }
//
//
// export type StateType = {
//     profilePage: profilePageType
//     dialogsPage: dialogsPageType
//     navbarPage: friendsType
// }
//
// export type StoreType = {
//     _state: StateType,
//     _CallSubscriber: (s: StateType) => void,
//     getState: () => StateType,
//     subscribe: (callback: () => void) => void,
//     addPostCallback: (postMessage: string) => void,
//     updateYourPostText: (newText: string) => void,
//     dispatch: (action: ActionType) => void
// }
//
// export type ActionType = ReturnType<typeof addPostActionCreate>
//     | ReturnType<typeof changeNewTextCreate>
//     | ReturnType<typeof addMessageActionCreate>
//     | ReturnType<typeof changeNewMessageTextCreate>
//     | ReturnType<typeof followAC>
//     | ReturnType<typeof unfollowAC>
//
// let store: StoreType = {
//     _state: {
//         profilePage: {
//             posts: [
//                 {id: 1, message: "Hello, It is my first massage", likeCounts: 15},
//                 {id: 2, message: "Hello, I am Lesha", likeCounts: 30},
//             ],
//             newPostText: ""
//         },
//         dialogsPage: {
//             messages: [
//                 {id: 1, message: "Hi"},
//                 {id: 2, message: "I am here"},
//                 {id: 3, message: "bye"},
//             ],
//             dialogs: [
//                 {id: 1, name: "Alex"},
//                 {id: 2, name: "Victor"},
//                 {id: 3, name: "Sasha"},
//                 {id: 4, name: "Mike"},
//                 {id: 5, name: "Bob"},
//             ],
//             newMessage: 'Hello'
//         },
//         navbarPage: {
//             friends: [
//                 {
//                     id: 1,
//                     name: 'Kirill',
//                     src: "https://cdni.rt.com/russian/images/2019.03/article/5c99e32a18356130668b45a2.JPG"
//                 },
//                 {
//                     id: 2,
//                     name: "Peeter",
//                     src: "https://vokrug-tv.ru/pic/person/2/2/d/b/22db573c1118bc091c4267e15258d8ce.jpeg"
//                 },
//                 {id: 3, name: "Vlad", src: "https://upload.wikimedia.org/wikipedia/ru/4/4e/Patrick_star-4854.jpg"},
//             ],
//         }
//     },
//     _CallSubscriber(s: StateType) {
//     },
//
//     getState() {
//         return this._state;
//     },
//     subscribe(observer) {
//         this._CallSubscriber = observer
//     },
//
//     addPostCallback(postMessage: string) {
//         let newPost: postType = {
//             id: new Date().getTime(),
//             message: postMessage,
//             likeCounts: 0
//         }
//         this._state.profilePage.posts.push(newPost)
//         this._CallSubscriber(this._state)
//     },
//     updateYourPostText(newText: string) {
//         this._state.profilePage.newPostText = newText;
//         this._CallSubscriber(this._state)
//     },
    // dispatch(action) {
    //
    //     this._state.profilePage = profileReducer(this._state.profilePage, action)
    //     this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
    //     this._state.navbarPage = navbarReducer(this._state.navbarPage, action)
    //     this._CallSubscriber(this._state)


        // if(action.type === 'ADD-POST'){
        //     let newPost: postType = {
        //         id: new Date().getTime(),
        //         message: action.postMessage,
        //         likeCounts: 0
        //     }
        //     this._state.profilePage.posts.push(newPost)
        //     this._CallSubscriber(this._state)
        // }else if(action.type === 'UPDATE-YOUR-POST-TEXT'){
        //     this._state.profilePage.newPostText = action.newText;
        //     this._CallSubscriber(this._state)
        // }else if(action.type === 'ADD-MESSAGE'){
        //     let newMessage: messageType = {
        //         id: new Date().getTime(),
        //         message: action.postMessage,
        //     }
        //     this._state.dialogsPage.messages.push(newMessage)
        //     this._CallSubscriber(this._state)
        // }else if(action.type === 'UPDATE-YOUR-MESSAGE-TEXT'){
        //     this._state.dialogsPage.newMessage = action.newText;
        //     this._CallSubscriber(this._state)
        // }
//     }
// }


//
// export default store
//
