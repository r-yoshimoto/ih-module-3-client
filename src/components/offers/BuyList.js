import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// import AddOffer from './AddOffer'; // <== !!!

class BuyList extends Component {
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
                <p className="title">Offers</p>
                <table className="table">
                  <thead>
                    <tr>
                      <th><abbr title="Title">Title</abbr></th>
                      <th><abbr title="Price">Price</abbr></th>
                      <th><abbr title="WUnity">Unity</abbr></th>
                      <th><abbr title="Minimum<">Minimum</abbr></th>
                      <th><abbr title="Category">Category</abbr></th>
                      <th><abbr title="Seller">Seller</abbr></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.listOfOffers.map(offer => {
                      if(offer.owner){
                      if (offer.owner._id !== this.props.loggedInUser._id) {
                        return (

                          <tr key={offer._id} className="is-selected">
                            <th>
                              <Link to={`/offers/${offer._id}`}>
                                <h3>{offer.title}</h3>
                              </Link>
                            </th>
                            <th>
                              <Link to={`/offers/${offer._id}`}>
                                <h3>${offer.price}</h3>
                              </Link>
                            </th>
                            <th>
                              <Link to={`/offers/${offer._id}`}>
                                <h3>{offer.unity}</h3>
                              </Link>
                            </th>
                            <th>
                              <Link to={`/offers/${offer._id}`}>
                                <h3>{offer.minimum}</h3>
                              </Link>
                            </th>
                            <th>
                              <Link to={`/offers/${offer._id}`}>
                                <h3>{offer.category}</h3>
                              </Link>
                            </th>
                            <th>
                              <Link to={`/offers/${offer._id}`}>
                                <h3>{offer.owner.fullName}</h3>
                              </Link>
                            </th>

                          </tr>

                        )
                      }
                    }
                    })
                    }
                  </tbody>
                </table>
              </div>
            </div>
            {/* <div className="column is-half">
              <AddOffer getData={() => this.getAllOffers()} />
            </div> */}
          </div>

          {/* <div className="columns">
            <div className="column">
              <h1>GLOBAL OFFER LIST WILL GO HERE</h1>
            </div>
          </div> */}
        </Fragment>
      )
    }
    else {
      return (
        <Fragment>
          <div className="columns">
            <div className="column is-half">

              <div className="list is-hoverable">
                <p className="title">Offers</p>
                <table class="table">
                  <thead>
                    <tr>
                      <th><abbr title="Title">Title</abbr></th>
                      <th><abbr title="Price">Price</abbr></th>
                      <th><abbr title="WUnity">Unity</abbr></th>
                      <th><abbr title="Minimum<">Minimum</abbr></th>
                      <th><abbr title="Category">Category</abbr></th>
                      <th><abbr title="Seller">Seller</abbr></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.listOfOffers.map(offer => {
                        if(offer.owner){
                        return (

                          <tr key={offer._id} className="is-selected">
                            <th>
                              <Link to={`/offers/${offer._id}`}>
                                <h3>{offer.title}</h3>
                              </Link>
                            </th>
                            <th>
                              <Link to={`/offers/${offer._id}`}>
                                <h3>${offer.price}</h3>
                              </Link>
                            </th>
                            <th>
                              <Link to={`/offers/${offer._id}`}>
                                <h3>{offer.unity}</h3>
                              </Link>
                            </th>
                            <th>
                              <Link to={`/offers/${offer._id}`}>
                                <h3>{offer.minimum}</h3>
                              </Link>
                            </th>
                            <th>
                              <Link to={`/offers/${offer._id}`}>
                                <h3>{offer.category}</h3>
                              </Link>
                            </th>
                            <th>
                              <Link to={`/offers/${offer._id}`}>
                                <h3>{offer.owner.fullName}</h3>
                              </Link>
                            </th>

                          </tr>

                        )
                        }
                    })
                    }
                  </tbody>
                </table>
              </div>
            </div>
            {/* <div className="column is-half">
              <AddOffer getData={() => this.getAllOffers()} />
            </div> */}
          </div>

          {/* <div className="columns">
            <div className="column">
              <h1>GLOBAL OFFER LIST WILL GO HERE</h1>
            </div>
          </div> */}
        </Fragment>
      )
    }
  }
}

export default BuyList;