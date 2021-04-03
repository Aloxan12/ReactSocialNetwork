import React from "react";
import styles from "./users.module.css";
import {UsersPropsType} from "./UsersContainer";
import {v1} from "uuid";
import * as axios from 'axios'
import userPhoto from '../../assets/images/user.png'


class UsersC extends React.Component<UsersPropsType> {

    componentDidMount() {
        axios.default.get("https://social-network.samuraijs.com/api/1.0/users")
            .then(response => {
                this.props.setUsers(response.data.items)
            });
    }

    render() {
        return (
            <div>
                {
                    this.props.usersPage.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto}
                                 className={styles.UsersPhoto}/>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => this.props.unfollow(u.id)}>Unfollow</button>
                                : <button onClick={() => this.props.follow(u.id)}>Follow</button>}
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
}

export default UsersC