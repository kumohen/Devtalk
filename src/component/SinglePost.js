import React, { Component } from 'react';
import { database,auth } from '../firebase';
import _ from "lodash";
class SinglePost extends Component {
    state={
        
        item:"",
        displayName:"",
        photoURL:"",
        commentText:""
    }
    componentWillMount(){
        auth.onAuthStateChanged(user => {
          if(user){
            this.setState({
              displayName:user.displayName,
              photoURL:user.photoURL
            })
          }
        })
      }
    componentDidMount(){
        const id = this.props.match.params.id;
       database.child(id).on("value",snapshot => {
           this.setState({
               item:snapshot.val()
           })
       })
    }
     handleSubmit = e => {
        e.preventDefault();
        const {commentText,displayName,photoURL} = this.state;
        const comment = {
            commentText,displayName,photoURL
        }
        const id = this.props.match.params.id;
        if(commentText !== "" ){
            database.child(id).child('comments').push(comment);
          
        }
        this.setState({
            commentText:""
        })
    }
    fetchComment(){
        return _.map(this.state.item.comments,(key,item)=> {
            console.log("key",key)
            console.log("item",item)
            return (
              <div key={item} className="container-fluid ">
                <div className="container lead ">
                  <div className="card mb-3">  
                  <div className="row">
                     <div className="col-sm-3">
                     <img className="rounded-circle"  src={key.photoURL} alt={key.displayName} height="18px" />  
                     <p className="ml-2" style={{fontSize:"14px",display:"inline-block"}}>{key.displayName}</p> 
                     </div> 
                  </div>
                     <p> {key.commentText}</p>
                  </div> 
                </div>
               </div>  
            )
          })
    }
    render() {
      const {item} = this.state;
      const comments = item.comments;
        let allComment = [];
       
        for(var element in comments){
            allComment.push(element)
        }
       
    //   if(comments !== null){
    //     allComment = Object.keys(comments);
    //   }
    //   console.log(allComment)
      
     return (
            <div className="container-fluid mt-5">
                <div className="container card">
                    <h3 className="card-title">{item.title}</h3>
                    <p>{item.body}</p>
                </div>
             
                
                <br/>
                <div className="container">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                        <label htmlFor="comment">Comment:</label>
                        <textarea type="text" onChange={(e) => this.setState({commentText:e.target.value})} className="form-control" rows="5" id="comment" placeholder="write your comment body here"></textarea>
                        </div>
                        <input type="submit" value="Comment" className="btn btn-outline-dark" />
                    </form>    
                </div>    
                <br/>
                <br/>
                <div className="container">
                {allComment.length > 0 &&
                 (<p> <i className="fa fa-comment-alt" /><span className="text-bold">All Comment :</span>  {allComment.length} </p>)}
                </div>
              
                {this.fetchComment()}
            </div>
        );
    }
}

export default SinglePost;