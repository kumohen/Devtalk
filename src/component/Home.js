import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import { auth, googleProvider } from '../firebase';


class Home extends Component {
    state ={
        login:false,
        reload:false
    }
    googleLogin = () => {
        console.log("login")
        auth.signInWithPopup(googleProvider);
      }
       
  
  componentWillMount(){
    auth.onAuthStateChanged(user => {
      if(user){
        this.setState({
          login:true
        })
      }
    })
  }
  
    render() {
        const {login} = this.state;
        if(login ){
           return <Redirect   to="/app" />
        }
      
        
        return (
            <div 
            >
               
            <div className="center">
                <button id="button1" type="button" className="btn btn-danger"  onClick={() => this.googleLogin()}>
                  <i className="fab fa-google-plus-g " />  Login with Your Google Account</button>
            </div>
            </div>
        );
    }
}

export default Home;