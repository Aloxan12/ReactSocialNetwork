import {ActionType, friendsType} from "./store";

let initialState = {
    friends: [
        { id: 1, name: 'Kirill', src:"https://cdni.rt.com/russian/images/2019.03/article/5c99e32a18356130668b45a2.JPG"},
        { id: 2, name: "Peeter", src: "https://vokrug-tv.ru/pic/person/2/2/d/b/22db573c1118bc091c4267e15258d8ce.jpeg"},
        { id: 3, name: "Vlad", src: "https://upload.wikimedia.org/wikipedia/ru/4/4e/Patrick_star-4854.jpg"},
    ],
}

const navbarReducer = (state: friendsType = initialState, action: ActionType)=>{

    return state
}

export default navbarReducer