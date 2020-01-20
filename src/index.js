import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Switch,Route,Redirect } from 'react-router-dom';
import SinglePost from "./component/SinglePost";
import Profile from "./component/Profile";
import Home from "./component/Home"
import Header from "./component/Navbar"
import CreatePost from "./component/CreatePost";


const Navbar = () => (
    <BrowserRouter>
        <div>
          <Header   />
        <Switch>
           <Route exact path="/" component={Home} />
           <Redirect from="/logout" to="/" />
          
           <Route exact path="/app" component={App} />
           <Route exact path="/createPost" component={CreatePost} /> 
           <Route exact path="/:uid/profile"  component={Profile} />
           <Route exact path="/:id" component={SinglePost} />
       
        </Switch>
        </div>
    </BrowserRouter>
  );


ReactDOM.render(<Navbar />, document.getElementById('root'));

serviceWorker.unregister();
