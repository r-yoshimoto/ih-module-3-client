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

  render() {
    return (
      <div>
        <div style={{ width: '60%', float: "left" }}>
          {this.state.listOfOrders.map(order => {
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
          })
          }
        </div>
        
      </div>
    )
  }
}

export default OrderList;