import React, { Component } from 'react';
import { auth,database } from './firebase';
import _ from "lodash";
import {Link} from "react-router-dom";
//import Profile from "./component/Profile";

class App extends Component {
    state = {
      displayName:"",
      photoURL:"",
      uid:"",
      title:"",
      body:"",
      items:""
    }
  //  googleLogin = () => {
  //   console.log("login")
  //   auth.signInWithPopup(googleProvider);
  // }
  // logout = ()=> {
  //   auth.signOut();
  // }
  // submitForm = (e)=> {
  //   e.preventDefault();
  //     const {title,body,uid,displayName} = this.state;
  //     const post = {
  //       title,body,
  //       uid,displayName
  //     }
  //     database.push(post).then(snapshot => {
  //       console.log(snapshot)
  //     })
  
  // }
 
  componentDidMount(){
    database.on('value',snapshot => {
      const items = snapshot.val();
      this.setState({
        items
      })
    })
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
  deleteItem = (id) => {
    database.child(id).remove();
  }
  fetchItems(){
    return _.map(this.state.items,(key,item)=> {
   
      return (
        <div key={item} className="container-fluid m-2">
          <div className="card"> 
          <div className="card-body">
          <div className="row">
          <div className="col-sm-3"> 
          <img className="rounded-circle mr-2"  src={this.state.items[item].photoURL} alt={this.state.items[item].displayName} height="18px" />   
          <p  style={{fontSize:"14px",display:"inline-block"}}>Posted by : <Link to={`/${this.state.items[item].uid}/profile`}>{this.state.items[item].displayName}</Link> </p>
          </div> 
           </div>
          <h5 className="card-title">{this.state.items[item].title}</h5>
             <p>{this.state.items[item].body}</p>
              {
                this.state.items[item].uid === this.state.uid ? (
                  <button className="btn btn-outline-danger btn-sm" onClick={() => this.deleteItem(item)}> <i className="fa fa-trash" /> delete</button>
                ) : ""
              }
           <Link className="btn btn-outline-info btn-sm ml-5" to={`${item}`}> <i className="fa fa-comment-alt" /> Detail</Link>
           </div>
           </div>
        </div>  
      )
    })
  }
  render() {
    
    return (
      <div>
         {/* <h3>My App</h3> */}
        {/* <button className="btn btn-danger" onClick={() => this.googleLogin()}>login with your google account</button> */}
        {
          // this.state.uid !== "" ? (
          //   <div>
              
          //   <h4>Login Your {this.state.displayName}</h4>
          //   <img height="100px" src={this.state.photoURL} alt="mohen" />
          // </div> 
          // ) : ""
        }
         <br/>
         {/* {
          this.state.uid !== "" ? (
            <div>
             <form onSubmit={this.submitForm}>
               <input  name="title" onChange={(e) => this.setState({title:e.target.value})} />
               <br/>
               <input  name="body" onChange={(e) => this.setState({body:e.target.value})} />
               <button className="btn btn-success">submit</button> 
             </form>  
          </div> 
          ) : ""
        } */}
         <br/>
        {/* <button className="btn btn-info" onClick={()=> this.logout()}>Logout</button> */}
         <br/>
          {this.fetchItems()} 
      </div>
    );
  }
}

export default App;