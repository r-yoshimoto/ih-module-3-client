import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



class OrderList extends Component {
  constructor() {
    super();
    this.state = { listOfOrders: [] };
  }

  getAllOrders = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/orders`, { withCredentials: true })
      .then(responseFromApi => {
        this.setState({
          listOfOrders: responseFromApi.data
        })
      })
  }

  componentDidMount() {
    this.getAllOrders();
  }

  ownershipCheck = (order) => {
    console.log(this.props.loggedInUser);
    console.log(order.owner);
    console.log(order.buyer);
    if(order.owner._id === this.props.loggedInUser._id){
    return (
      <div>
        <div>{this.renderEditForm()} </div>
        <button onClick={() => this.deleteOffer(this.state._id)}>Delete offer</button>
      </div>
    )
    } 
  }


  render() {
    
    return (
      <div>
        <div style={{ width: '60%', float: "left" }}>
          {this.state.listOfOrders.map(order => { 
            console.log(order.owner)
            console.log(order.buyer)
            console.log(this.props.loggedInUser)
            if(order.owner._id === this.props.loggedInUser._id || order.buyer._id === this.props.loggedInUser._id  ){
            return (
              <div key={order._id}>
                <Link to={`/orders/${order._id}`}>
                  <h3>{order._id}</h3>
                </Link>
                {/* 🥁 added so the tasks can be displayed:  🥁 */}
                {/* <ul>
                  { offer.tasks.map((task, index) => {
                    return <li key={index}>{task.title}</li>
                  }) }
                </ul>   */}
                {/* <p style={{maxWidth: '400px'}} >{project.description} </p> */}
              </div>
            )
              }
          })
          }
        </div>
        
      </div>
    )
  }
}

export default OrderList;