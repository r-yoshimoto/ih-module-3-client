import React, { Component, Fragment } from 'react';
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
    // console.log(this.props.loggedInUser)
    if (this.props.loggedInUser) {
      return (
        <Fragment>
          <div className="columns">
            <div className="column is-half">
              <div className="list is-hoverable">
                <p className="title">My Offers</p>
                {this.state.listOfOffers.map(offer => {
                  // console.log(offer.owner._id)
                  if(offer.owner){
                  if (offer.owner._id === this.props.loggedInUser._id) {
                    return (

                      <div key={offer._id}>
                        <Link className="list-item" to={`/offers/${offer._id}`}>
                          <h3>{offer.title}</h3>
                        </Link>

                      </div>

                    )
                  }
                }
                })
                }
              </div>
              
            </div>
            <div className="column is-half">
              <AddOffer getData={() => this.getAllOffers()} />
            </div>
          </div>

          {/* <div className="columns">
            <div className="column">
              <h1>GLOBAL OFFER LIST WILL GO HERE</h1>
            </div>
          </div> */}
        </Fragment>
      )
    }
    else{
      return (
        <Fragment>
          <div className="columns">
            <div className="column is-half">
              <div className="list is-hoverable">
                {this.state.listOfOffers.map(offer => {
                  
                  
                    return (

                      <div key={offer._id}>
                        <Link className="list-item" to={`/offers/${offer._id}`}>
                          <h3>{offer.title}</h3>
                        </Link>

                      </div>

                    )
                  
                })
                }
              </div>
              
            </div>
            
          </div>

          
        </Fragment>
      )
    }
  }
}

export default OfferList;