import React, {ComponentType} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Music from './components/Music/Music';
import News from './components/News/News';
import Setting from './components/Setting/Setting';
import {BrowserRouter, HashRouter, Redirect, Route, withRouter} from "react-router-dom";
import store, {RootReduxStateType} from "./redux/redux-store";
import {UsersContainer} from "./components/Users/UsersContainer";
import HeaderContainer from './components/Header/HeaderContainer';
import {Login} from './components/Login/Login';
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializedApp} from "./redux/app-reducer";
import Preloader from "./components/Common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";
import {initialStateType} from "./redux/navbar-reducer";

const DialogsContainer = React.lazy(()=>import ("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(()=>import ("./components/Profile/ProfileContainer"));

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)

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
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar state={this.props.stateForNavbar}/>
        <div className="app-wrapper-content">
          <Route path='/' render={() => <Redirect to={'/profile'}/>}/>
          <Route path='/profile/:userId?' render={() => <SuspendedProfile/>}/>
          <Route path='/dialogs' render={() => <SuspendedDialogs/>}/>
          <Route path='/users' render={() => <UsersContainer pageTitle={'Пользователи'} />}/>
          <Route path='/login' render={() => <Login/>}/>
          <Route path='/music' render={() => <Music/>}/>
          <Route path='/news' render={() => <News/>}/>
          <Route path='/setting' render={() => <Setting/>}/>
        </div>
      </div>
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
