import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {Avatar, Button, Col, Layout, Menu, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {RootReduxStateType} from "../../redux/redux-store";
import {selectIsAuth, selectUserCurrent} from "../../redux/auth-selector";


const Header = React.memo(() => {
    const {Header} = Layout;

    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectUserCurrent)
    const dispatch = useDispatch()


    const logoutCallback = () => {
        dispatch(logout())
    }
    return (
        <Header className="header">
            <div className="logo"/>
            <Row>
                <Col span={18}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="5"><Link to="/users">Users</Link></Menu.Item>
                        <Menu.Item key="9"><Link to="/Chat">Chat</Link></Menu.Item>
                    </Menu>
                </Col>
                {isAuth
                    ? <>
                        <Col span={1}>
                            <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                        </Col>
                        <Col span={4}>
                            <Button onClick={logoutCallback}>logout</Button>
                        </Col>
                    </>
                    : <Col span={6}>
                        <Button>
                            <Link to={'/login'}>Login</Link>
                        </Button>
                    </Col>}
            </Row>
        </Header>





        // <header className={classes.header}>
        //     <img
        //         src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_TV_2015.svg/1200px-Logo_TV_2015.svg.png"
        //         alt="logo"/>
        //
        //     <div className={classes.loginBlock}>
        //         {props.isAuth
        //             ? <div>{props.login} - <button onClick={logoutCallback}>logout</button></div>
        //             : <NavLink to={'/login'}>Login</NavLink>}
        //     </div>
        // </header>
    );
})
export default Header;