import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import AddOffer from './AddOffer'; // <== !!!

class OfferList extends Component {
  constructor() {
    super();
    this.state = { listOfOffers: [] };
  }

  getAllOffers = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/offers`, { withCredentials: true })
      .then(responseFromApi => {
        this.setState({
          listOfOffers: responseFromApi.data
        })
      })
  }

  componentDidMount() {
    this.getAllOffers();
  }

  render() {
    return (
      <div>
        <div style={{ width: '60%', float: "left" }}>
          {this.state.listOfOffers.map(offer => {
            return (
              <div key={offer._id}>
                <Link to={`/offers/${offer._id}`}>
                  <h3>{offer.title}</h3>
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
        <div style={{ width: '40%', float: "right" }}>
          <AddOffer getData={() => this.getAllOffers()} />
        </div>
      </div>
    )
  }
}

export default OfferList;