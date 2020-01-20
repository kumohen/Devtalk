import React, { Component } from 'react';
import { auth,database } from '../firebase';
import {Redirect} from "react-router-dom";
class CreatePost extends Component {
    state = {
        displayName:"",
        photoURL:"",
        uid:"",
        title:"",
        body:"",
        items:"",
        success:false,
        login:false
      }
      componentWillMount(){
        auth.onAuthStateChanged(user => {
          if(user){
            this.setState({
              displayName:user.displayName,
              photoURL:user.photoURL,
              uid:user.uid
            })
          }
        })
      }
     
      submitForm = (e)=> {
        e.preventDefault();
          const {title,body,uid,displayName,photoURL} = this.state;
          const post = {
            title,body,
            uid,displayName,photoURL
          }
          database.push(post).then(snapshot => {
            console.log(snapshot)
          })
          this.setState({
              title:"",
              body:"",
              success:true
          })
      }
    render() {
        console.log(this.state)
        if(this.state.success){
            return <Redirect   to="/app" />
        }
      
      
        return (
            <div className="container-fluid">
            <div className="container">
             <h3 className="text-center m-4">Create Your  Post</h3>
            <form onSubmit={this.submitForm}>
                <div className="form-group">
                    <label htmlFor="title">Post Title</label>
                    <input type="text" className="form-control"  name="title" onChange={(e) => this.setState({title:e.target.value})} placeholder="Enter post title"/>
                   
                </div>
                <div className="form-group">
                        <label htmlFor="comment">Content:</label>
                        <textarea type="text" onChange={(e) => this.setState({body:e.target.value})} className="form-control" rows="4" id="body" placeholder="Enter Your post content"></textarea>
                </div>
           
            <button type="submit" className="btn btn-outline-warning">CreatePost</button>
            </form>
            </div>  
            </div>
        );
    }
}

export default CreatePost;