import React, { Component } from 'react';
import { auth,database2} from '../firebase';
import _ from "lodash";
import {withRouter} from "react-router-dom";

class Profile extends Component {
    state = {
        displayName:"",
        photoURL:"",
        uid:"",
        position:"",
        language:"",
        experience:"",
        hobby:"",
        degree:"",
        items:""
      }
   
    // componentDidMount(){
    //   console.log("compoenrdidmount")
    //     auth.onAuthStateChanged(user => {
    //       if(user){
    //         this.setState({
    //           displayName:user.displayName,
    //           photoURL:user.photoURL,
    //           uid:user.uid
    //         })
    //       }
    //     })
      
    //   }
      componentWillMount(){
        const id = this.props.match.params.uid;
        console.log(id);
        auth.onAuthStateChanged(user => {
          if(user){
            database2.child(id).on('value',snapshot => {
              this.setState({
                items:snapshot.val(),
                displayName:user.displayName,
                photoURL:user.photoURL,
                uid:user.uid
              })
            })
          }
        })
      }
      //  fetchItem = ()=>{
      //    const {uid} = this.state;
      //    database.child(uid).on('value',snapshot => {
      //       const items = snapshot.val();
      //       this.setState({
      //         items
      //       })
      //     })
      //  }
       fetchProfieDetails = ()=> {
        return _.map(this.state.items,(key,item)=> {
          console.log("key",key.language.split(" ").map(item => item))
          console.log("item",item)
          return (
            <div key={item}>
             
               <div className="container-fluid">
               <div className="row lead mb-5">
                   <div className="col-sm-2">

                   </div>
                   <div className="col-sm-3">
                   <img className="rounded-circle"  src={key.photoURL} alt={key.displayName} height="180px" />
                     </div>
                     <div className="col-sm-3">
                     
                     </div>
                 </div>
                 <div className="row lead" >
                   <div className="col-sm-2">

                   </div>
                   <div className="col-sm-4">
                     <p><i className="fa fa-user" /> User Name :<b> {key.displayName}</b></p>
                     <p ><b><i className="fa fa-heart "/>{"  "}Hobbies:</b></p>
                     { key.hobby && key.hobby.split(" ").map(item => <ul key={item}><li >{item}</li></ul>)}    
                   </div>
                   <div className="col-sm-4">
                   <p><b><i className="fa fa-user-graduate " /> Degree:</b>{"  "}{key.degree}</p>  
                  <p><b>Status:</b>{"  "}{key.position}</p>
                  <p ><b><i className="fa fa-laptop-code" />Programming language & Tools:</b></p>
                  {key.language.split(" ").map(item => <ul key={item}><li >{item}</li></ul>)}
                  <p><b >Experience:</b>{"    "}{key.experience}</p>  
                   </div>
                 </div>
               </div>  
            </div>  
          )
        })
       }
      
      submitForm = (e)=> {
        e.preventDefault();
          const {position,experience,language,uid,displayName,photoURL,hobby,degree} = this.state;
          const post = {
            position,experience,hobby,degree,
            language,uid,displayName,photoURL
          }
          database2.child(uid).push(post).then(snapshot => {
            console.log(snapshot)
          })
      
      }

    render() {
      
        const ParamId = (this.props.match.params.uid)
        const Uid = (this.state.uid);
       console.log(this.state.items)
        return (
            <div>
                <div className="container">
                
                </div> 
               {/* {
             this.state.uid !== "" ? (
            <div>
              
            <h4>Login Your {this.state.displayName}</h4>
            <img height="100px" src={this.state.photoURL} alt="mohen" />
          </div> 
          ) : ""
         } */}
         <br/>
         <div>
           
             {ParamId === Uid && this.state.items === null ? (
              //    <form onSubmit={this.submitForm}>
             
              //    <input  name="position" placeholder="position" onChange={(e) => this.setState({position:e.target.value})} />
              //    <br/>
              //    <input  name="language" placeholder="language" onChange={(e) => this.setState({language:e.target.value})} />
              //    <br/>
              //    <input  name="experience" placeholder="experience" onChange={(e) => this.setState({experience:e.target.value})} />
              //    <button className="btn btn-success">submit</button> 
              //  </form>
              <div className="container">
                 <h3 className="text-center bg-info m-4">Update Your Profile</h3>
              <form onSubmit={this.submitForm}>
                   <div className="form-group">
                    <label htmlFor="body">Degree</label>
                    <input type="text" className="form-control" name="degree" onChange={(e) => this.setState({degree:e.target.value})} placeholder="Like CS or any other degree"/>
                </div>
                <div className="form-group">
                    <label htmlFor="body">Programming Language</label>
                    <input type="text" className="form-control" name="language" onChange={(e) => this.setState({language:e.target.value})} placeholder="Programming language @example c c++ react"/>
                </div>
                <div className="form-group">
                    <label htmlFor="title">Position</label>
                    <input type="text" className="form-control"  name="position" onChange={(e) => this.setState({position:e.target.value})} placeholder="@example senior react developer"/>
                   
                </div>
                <div className="form-group">
                    <label htmlFor="body">Experience</label>
                    <input type="text" className="form-control" name="experience" onChange={(e) => this.setState({experience:e.target.value})} placeholder="@example 1 years experience"/>
                </div>
             
                <div className="form-group">
                    <label htmlFor="body">Hobby</label>
                    <input type="text" className="form-control" name="hobby" onChange={(e) => this.setState({hobby:e.target.value})} placeholder="write your hobbies without  (,) comma"/>
                </div>
            <button type="submit" className="btn btn-success">Update Your Profile</button>
            </form>
            </div>
             ) : "" }  
             
            </div>   
              {this.fetchProfieDetails()}
            </div>
        );
    }
}

export default (withRouter(Profile));