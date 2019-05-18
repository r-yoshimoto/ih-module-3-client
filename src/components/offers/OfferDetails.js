import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditOffer from './EditOffer';
// import AddTask from '../tasks/AddTask';



class OfferDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getSingleOffer();
  }

  getSingleOffer = () => {
    const { params } = this.props.match;
    axios.get(`${process.env.REACT_APP_API_URL}/api/offers/${params.id}`, { withCredentials: true })
      .then(responseFromApi => {
        const theOffer = responseFromApi.data;
        this.setState(theOffer);
      })
      .catch((err) => {
        console.log(err)
      })
  }
  renderEditForm = () => {
    if (!this.state.title) {
      this.getSingleOffer();
    } else {
      //                                                    {...props} => so we can have 'this.props.history' in Edit.js
      //                                                                                          ^
      //                                                                                          |
      return <EditOffer the={this.state} getTheOffer={this.getSingleOffer} {...this.props} />

    }
  }

  // DELETE PROJECT:
  deleteOffer = () => {
    const { params } = this.props.match;
    axios.delete(`${process.env.REACT_APP_API_URL}/api/offers/${params.id}`, { withCredentials: true })
      .then(() => {
        this.props.history.push('/offers'); // !!!         
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // renderAddTaskForm = () => {
  //   if(!this.state.title){
  //       this.getSingleProject();
  //     } else {     
  //               // pass the project and method getSingleProject() as a props down to AddTask component
  //       return <AddTask theProject={this.state} getTheProject={this.getSingleProject} />
  //     }
  // }

  // ownershipCheck = (project) => {
  //   if(this.props.loggedInUser && project.owner === this.props.loggedInUser._id){
  //     return (
  //       <div>
  //         <div>{this.renderEditForm()} </div>
  //         <button onClick={() => this.deleteProject(this.state._id)}>Delete project</button>
  //       </div>
  //     )
  //   } 
  // }



  render() {
    console.log(this.state.owner)
    // console.log(this.state.owner.email)
    if (this.state.owner) {
      return (
        <div>
          <h1>{this.state.title}</h1>
          <p>{this.state.description}</p>
          <p>{this.state.price}</p>
          <p>{this.state.unity}</p>
          <p>{this.state.minimum}</p>
          <p>{this.state.category}</p>
          <p>{this.state.owner.fullName}</p>
          {/* <div>
          {this.ownershipCheck(this.state)}
        </div> */}
          <Link to={'/offers'}>Back to offers</Link>
        </div>
      )
    }
    else{
      return(
        <div>XX</div>
      )
    }
  }
}

export default OfferDetails;

// render(){
//   return(
//     <div>
//       <h1>{this.state.title}</h1>
//       <p>{this.state.description}</p>
//       {/* show the task heading only if there are tasks */}
//       { this.state.tasks && this.state.tasks.length > 0 && <h3>Tasks </h3> }
//       {/* map through the array of tasks and... */}
//       { this.state.tasks && this.state.tasks.map((task, index) => {
//           return(
//               <div key={ index }>
//               {/* ... make each task's title a link that goes to the task details page */}
//                   <Link to={`/projects/${this.state._id}/tasks/${task._id}`}> 
//                       { task.title }
//                   </Link>
//               </div>
//           )

//       }) }
//       <div >
//       {this.ownershipCheck(this.state)}
//       </div>
//       <button onClick={() => this.deleteProject()}>Delete project</button> {/* <== !!! */}
//       <br/>
//       <div>{this.renderAddTaskForm()} </div>
//       <br/><br/><br/><br/><br/>
//       <Link to={'/projects'}>Back to projects</Link>
//     </div>
//   )
// }