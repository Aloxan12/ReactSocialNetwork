import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Music from './components/Music/Music';
import News from './components/News/News';
import Setting from './components/Setting/Setting';
import { BrowserRouter, Route } from "react-router-dom";
import {StoreReduxType} from "./redux/redux-store";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from './components/Header/HeaderContainer';

export type AppType = {
  store:StoreReduxType
}

const App: React.FC<AppType> = (props) => {
  const state = props.store.getState();
  return <BrowserRouter>
    <div className="app-wrapper">
      <HeaderContainer />
      <Navbar state={state.navbarPage}/>
      <div className="app-wrapper-content">
        <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
        <Route path='/dialogs' render={() => <DialogsContainer />}  />
        <Route path='/users' render={() => <UsersContainer /> }  />
        <Route path='/music' render={() => <Music />} />
        <Route path='/news' render={() => <News />} />
        <Route path='/setting' render={() => <Setting />} />
      </div>
    </div>
  </BrowserRouter>;
}

export default App;
