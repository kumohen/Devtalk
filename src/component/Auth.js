import React, { Component } from 'react';
import {auth} from "../firebase";
class Auth extends Component {
    state={
        uid:""
    }
    componentWillMount(){
        auth.onAuthStateChanged(user => {
          if(user){
            this.setState({
              uid:user.uid
            })
          }
        })
      }
    render() {
        const {uid} = this.state;
        return (
            <div>
                { uid !== "" ?  this.props.children : ""}
            </div>
        );
    }
}

export default Auth;