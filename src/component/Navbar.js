import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { auth } from '../firebase';

class Navbar extends Component {
    state={
        login:false
    }
    logout = ()=> {
        auth.signOut();
        this.setState({
            login:false
        })
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
        //  if(!this.state.login){
        //      return <Redirect  to="/" />
        //  }
        console.log(this.state)
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-primary">
 
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                            <li className="nav-item active">
                            <Link className="nav-link pull-right" to="#" ><i className="fas fa-globe fa-2x " /> 
                            <span style={{fontFamily:"Oleo Script",fontSize:"20"}}>DevTalk</span> </Link>
                            </li>
                    {
                        this.state.login ? (
                            <>
                            <li className="nav-item active ml-20">
                            <Link className="nav-link " to="/app"><i className="fas fa-blog fa-2x"/> Feed <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item active">
                            <Link className="nav-link" to="/createPost"><i className="fa fa-plus-circle fa-2x "/> CreatePost <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item active">
                            <Link className="nav-link" to="/logout" onClick={() => this.logout()}><i className="fas fa-sign-out-alt fa-2x" />logout </Link>
                            </li>
                           
                            </>
                        ):(
                            <li className="nav-item action">
                            <Link className="nav-link disabled" to="/"><i className="fa fa-home fa-2x" /> Home</Link>
                        </li>
                        )
                    }
                </ul>
                {/* <button className="pull-right" onClick={()=> this.logout()}>Logout</button> */}
            </div>
            </nav>
        );
    }
}

export default Navbar;