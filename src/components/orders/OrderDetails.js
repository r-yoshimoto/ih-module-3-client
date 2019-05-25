import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import EditOffer from './EditOffer';
// import AddTask from '../tasks/AddTask';



class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    componentDidMount() {
        this.getSingleOrder();
    }

    getSingleOrder = () => {
        const { params } = this.props.match;
        axios.get(`${process.env.REACT_APP_API_URL}/api/orders/${params.id}`, { withCredentials: true })
            .then(responseFromApi => {
                const theOrder = responseFromApi.data;
                this.setState(theOrder);
            })
            .catch((err) => {
                console.log(err)
            })
    }
    //   renderEditForm = () => {
    //     if (!this.state.title) {
    //       this.getSingleOffer();
    //     } else {
    //                                                    {...props} => so we can have 'this.props.history' in Edit.js
    //                                                                                          ^
    //                                                                                          |
    //       return <EditOffer theOffer={this.state} getTheOffer={this.getSingleOffer} {...this.props} />

    //     }
    //   }

    // DELETE PROJECT:
    //   deleteOffer = () => {
    //     const { params } = this.props.match;
    //     axios.delete(`${process.env.REACT_APP_API_URL}/api/offers/${params.id}`, { withCredentials: true })
    //       .then(() => {
    //         this.props.history.push('/offers'); // !!!         
    //       })
    //       .catch((err) => {
    //         console.log(err)
    //       })
    //   }

    // renderAddTaskForm = () => {
    //   if(!this.state.title){
    //       this.getSingleProject();
    //     } else {     
    //               // pass the project and method getSingleProject() as a props down to AddTask component
    //       return <AddTask theProject={this.state} getTheProject={this.getSingleProject} />
    //     }
    // }

    ownershipCheck = (order) => {
        // if(this.props.loggedInUser && project.owner === this.props.loggedInUser._id){
        return (
            <div>
                <div>{this.renderEditForm()} </div>
                <button onClick={() => this.deleteOffer(this.state._id)}>Delete offer</button>
            </div>
        )
        // } 
    }



    //   handleFormSubmit = (event) => {
    //     event.preventDefault();
    //     const title = this.state.title;
    //     const description = this.state.description;
    //     const price = this.state.price;
    //     const unity = this.state.unity;
    //     const minimum = this.state.minimum;
    //     const category = this.state.category;
    //     const total = this.state.total;
    //     const totalPrice = this.state.totalPrice;
    //     const owner = this.state.owner._id;
    //     console.log(owner)
    //     axios.post(`${process.env.REACT_APP_API_URL}/api/orders`, {
    //       title, description, price, unity, minimum, category, total, totalPrice, owner
    //     }, { withCredentials: true })
    //       .then(() => {
    //         console.log("ok")
    //       })
    //       .catch(error => console.log(error))
    //   }

    //   handleChange = (event) => {
    //     const { name, value } = event.target;
    //     this.setState({ [name]: value }, () => {
    //       this.setState({ totalPrice: this.state.price * this.state.total })
    //     });

    //   }

    render() {
        // console.log(this.state.owner)
        // console.log(this.state.owner._id)
        if (this.state.owner) {
            if (this.state.buyer) {
                // console.log(this.state.owner._id)
                return (
                    <div>
                        <h1>{this.state.title}</h1>
                        
                        <p>{this.state.description}</p>
                        <p>{this.state.price}</p>
                        <p>{this.state.unity}</p>
                        <p>{this.state.minimum}</p>
                        <p>{this.state.category}</p>
                        <p>{this.state.total}</p>
                        <p>{this.state.totalPrice}</p>
                        <p>{this.state.status}</p>
                        <p>{this.state.owner.fullName}</p>
                        <p>{this.state.buyer.fullName}</p>
                        {/* <div>
                            {this.ownershipCheck(this.state)}
                        </div> */}
                        {/* <div>
            <form onSubmit={this.handleFormSubmit}>
              <input type="hidden" name="title" value={this.state.title} />
              <input type="hidden" name="description" value={this.state.description} />
              <input type="hidden" name="price" value={this.state.price} />
              <input type="hidden" name="unity" value={this.state.unity} />
              <input type="hidden" name="minimum" value={this.state.minimum} />
              <input type="hidden" name="category" value={this.state.category} />
              <input type="hidden" name="owner" value={this.state.owner._id} />
              <label>Quantity</label>
              <input type="number" name="total" value={this.state.total} onChange={e => this.handleChange(e)} />
              <label>Total Price: {this.state.totalPrice}</label>
              <input type="submit" value="Submit" />
            </form>


          </div> */}

                        <Link to={'/orders'}>Back to orders</Link>
                    </div>
                )
            }
        }
        else {
            return (
                <div>XX</div>
            )
        }
    }
}

export default OrderDetails;