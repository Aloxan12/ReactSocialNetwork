import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Header.module.css';
import {HeaderContainerType} from "./HeaderContainer";
import {useDispatch} from "react-redux";
import {logout} from "../../redux/auth-reducer";

const Header = (props: HeaderContainerType) => {

    const dispatch = useDispatch()
    const logoutCallback = () => {
        dispatch(logout())
    }
    return (
        <header className={classes.header}>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_TV_2015.svg/1200px-Logo_TV_2015.svg.png"
                alt="logo"/>

            <div className={classes.loginBlock}>
                {props.isAuth
                    ? <div>{props.login} - <button onClick={logoutCallback}>logout</button></div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    );
}
export default Header;