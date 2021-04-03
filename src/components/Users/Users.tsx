import React from "react";
import styles from "./users.module.css";
import {UsersPropsType} from "./UsersContainer";
import {v1} from "uuid";
import * as axios from 'axios'
import userPhoto from '../../assets/images/user.png'


const Users = (props: UsersPropsType) => {
    const getUsers =()=> {
        if (props.usersPage.users.length === 0) {
            // props.setUsers([
            //     {
            //         followed: true,
            //         id: v1(),
            //         fullName: "Alexey",
            //         status: 'I am a boss',
            //         location: {city: 'Minsk', country: "Belarus"},
            //         photoUrl: 'https://i.pinimg.com/originals/45/bf/e7/45bfe7aee375cb2fab3f9b7393d4c886.jpg',
            //     },
            //     {
            //         followed: false,
            //         id: v1(),
            //         fullName: "Victoria",
            //         status: 'I am a princess',
            //         location: {city: 'New York', country: "USA"},
            //         photoUrl: 'https://i.pinimg.com/originals/45/bf/e7/45bfe7aee375cb2fab3f9b7393d4c886.jpg',
            //     },
            //     {
            //         followed: true,
            //         id: v1(),
            //         fullName: "Sergey",
            //         status: 'I am a comedian',
            //         location: {city: 'Kiev', country: "Ukraine"},
            //         photoUrl: 'https://i.pinimg.com/originals/45/bf/e7/45bfe7aee375cb2fab3f9b7393d4c886.jpg',
            //     },
            //     {
            //         followed: true,
            //         id: v1(),
            //         fullName: "Vladislav",
            //         status: 'I am a musician',
            //         location: {city: 'Russia', country: "Moscow"},
            //         photoUrl: 'https://i.pinimg.com/originals/45/bf/e7/45bfe7aee375cb2fab3f9b7393d4c886.jpg',
            //     },
            // ])
            axios.default.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
                props.setUsers(response.data.items)
            });
        }
    }

    return (
        <div>
            <button onClick={getUsers}>Get users</button>
            {
                props.usersPage.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto}
                                 className={styles.UsersPhoto}/>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => props.unfollow(u.id)}>Unfollow</button>
                                : <button onClick={() => props.follow(u.id)}>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{"u.location.country"}</div>
                            <div>{"u.location.city"}</div>
                            <div></div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    )
}

export default Users