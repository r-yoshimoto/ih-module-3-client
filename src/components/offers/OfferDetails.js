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
      return <EditOffer theOffer={this.state} getTheOffer={this.getSingleOffer} {...this.props} />

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

  ownershipCheck = (offer) => {
    // if(this.props.loggedInUser && project.owner === this.props.loggedInUser._id){
      return (
        <div>
          <div>{this.renderEditForm()} </div>
          <button onClick={() => this.deleteOffer(this.state._id)}>Delete offer</button>
        </div>
      )
    // } 
  }

  

  handleFormSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    const price = this.state.price;
    const unity = this.state.unity;
    const minimum = this.state.minimum;
    const category = this.state.category;
    const total = this.state.total;
    const totalPrice = this.state.totalPrice;
    const owner = this.state.owner;
    
    axios.post(`${process.env.REACT_APP_API_URL}/api/orders`, {
       title, description, price, unity, minimum, category, total, totalPrice, owner
      }, {withCredentials:true})
    .then( () => {
        // this.props.getData();
        // this.setState({total: ""});
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value}, () => {
        this.setState({ totalPrice: this.state.price*this.state.total})
      });
      console.log(this.state.price);
      console.log(this.state.total);
  }

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
          <div>
          {this.ownershipCheck(this.state)}
          </div>
          <div>
          <form onSubmit={this.handleFormSubmit}>
          
          <input type="hidden" name="title" value={this.state.title} />
          
          <input type="hidden" name="description" value={this.state.description}  />
          
          <input type="hidden" name="price" value={this.state.price}  />
          
          <input type="hidden"  name="unity" value={this.state.unity}  />
          
          <input type="hidden" name="minimum" value={this.state.minimum}  />
          
          <input type="hidden" name="category" value={this.state.category}  /> 

          <input type="hidden" name="owner" value={this.state.owner}  />   
          
          <label>Quantity</label>
          <input type="number" name="total" value={this.state.total} onChange={ e => this.handleChange(e)} /> 

          <label>Total Price: {this.state.totalPrice}</label>


          <input type="submit" value="Submit" />
        </form>

          
          </div>

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