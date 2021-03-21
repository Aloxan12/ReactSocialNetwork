import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import Music from './components/Music/Music';
import News from './components/News/News';
import Setting from './components/Setting/Setting';
import { BrowserRouter, Route } from "react-router-dom";
import {StoreReduxType} from "./redux/redux-store";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import SuperDialogsContainer from "./components/Dialogs/DialogsContainer";

export type AppType = {
  store:StoreReduxType
}

const App: React.FC<AppType> = (props) => {
  const state = props.store.getState();
  return <BrowserRouter>
    <div className="app-wrapper">
      <Header />
      <Navbar state={state.navbarPage}/>
      <div className="app-wrapper-content">
        <Route path='/profile' render={() => <Profile state={state.profilePage} />} />
        <Route path='/dialogs' render={() => <DialogsContainer state={state.dialogsPage} />}  />
        <Route path='/music' render={() => <Music />} />
        <Route path='/news' render={() => <News />} />
        <Route path='/setting' render={() => <Setting />} />
      </div>
    </div>
  </BrowserRouter>;
}

export default App;
