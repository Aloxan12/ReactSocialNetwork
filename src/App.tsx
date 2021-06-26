import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Music from './components/Music/Music';
import News from './components/News/News';
import Setting from './components/Setting/Setting';
import {BrowserRouter, Link, Redirect, Route, withRouter} from "react-router-dom";
import store, {RootReduxStateType} from "./redux/redux-store";
import {UsersContainer} from "./components/Users/UsersContainer";
import {Login} from './components/Login/Login';
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializedApp} from "./redux/app-reducer";
import Preloader from "./components/Common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";
import {initialStateType} from "./redux/navbar-reducer";
import {Breadcrumb, Layout, Menu} from "antd";
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import Header from "./components/Header/Header";


const { SubMenu } = Menu;
const {Content, Footer, Sider } = Layout;

const DialogsContainer = React.lazy(()=>import ("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(()=>import ("./components/Profile/ProfileContainer"));
const ChatPage = React.lazy(()=>import ("./pages/ChatPage/ChatPage"));

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedChat = withSuspense(ChatPage)

class App extends React.Component<mapStateToPropsType & mapDispatchToPropsType> {
  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    alert('Some error occured')
  }

  componentDidMount() {
    this.props.initializedApp()
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader/>
    }
    return <BrowserRouter>
      <Layout>
        <Header />
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Sider className="site-layout-background" width={200}>
              <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  // defaultOpenKeys={['sub1']}
                  style={{ height: '100%' }}
              >
                <SubMenu key="sub1" icon={<UserOutlined />} title="My Profile">
                  <Menu.Item key="1"><Link to="/profile">Profile</Link></Menu.Item>
                  <Menu.Item key="2"><Link to="/dialogs">Messages</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LaptopOutlined />} title="Developers">
                  <Menu.Item key="5"><Link to="/users" >Users</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<NotificationOutlined />} title="Chat">
                  <Menu.Item key="9"><Link to="/chat" >Chat</Link></Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Route path='/' render={() => <Redirect to={'/profile'}/>}/>
              <Route path='/profile/:userId?' render={() => <SuspendedProfile/>}/>
              <Route path='/dialogs' render={() => <SuspendedDialogs/>}/>
              <Route path='/chat' render={() => <SuspendedChat/>}/>
              <Route path='/users' render={() => <UsersContainer pageTitle={'Пользователи'} />}/>
              <Route path='/login' render={() => <Login/>}/>
              <Route path='/music' render={() => <Music/>}/>
              <Route path='/news' render={() => <News/>}/>
              <Route path='/setting' render={() => <Setting/>}/></Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Social Network ©2021</Footer>
      </Layout>
      {/*<div className="app-wrapper">*/}
      {/*  <HeaderContainer />*/}
      {/*  <Navbar state={this.props.stateForNavbar}/>*/}
      {/*  <div className="app-wrapper-content">*/}
      {/*    <Route path='/' render={() => <Redirect to={'/profile'}/>}/>*/}
      {/*    <Route path='/profile/:userId?' render={() => <SuspendedProfile/>}/>*/}
      {/*    <Route path='/dialogs' render={() => <SuspendedDialogs/>}/>*/}
      {/*    <Route path='/users' render={() => <UsersContainer pageTitle={'Пользователи'} />}/>*/}
      {/*    <Route path='/login' render={() => <Login/>}/>*/}
      {/*    <Route path='/music' render={() => <Music/>}/>*/}
      {/*    <Route path='/news' render={() => <News/>}/>*/}
      {/*    <Route path='/setting' render={() => <Setting/>}/>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </BrowserRouter>;
  }
}

type mapStateToPropsType = {
  initialized: boolean
  stateForNavbar: initialStateType
}
type mapDispatchToPropsType = {
  initializedApp:()=>void
}

const mapStateToProps =(state: RootReduxStateType): mapStateToPropsType => ({
  initialized:state.app.initialized,
  stateForNavbar: state.navbarPage
})

let AppClass = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps,{initializedApp}))(App);

const AppContainer: React.FC = () => {
  return <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <AppClass />
    </Provider>
  </BrowserRouter>
}

export default AppContainer
