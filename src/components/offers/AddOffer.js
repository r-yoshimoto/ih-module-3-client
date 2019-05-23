import React, { Component } from 'react';
import axios from 'axios';

class AddOffer extends Component {
  constructor(props){
      super(props);
      this.state = { 
       title: "",
       description: "",
       price: "",
       unity: "",
       minimum: "",
       category: "Fruits",
       owner: ""
      };
  }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    const price = this.state.price;
    const unity = this.state.unity;
    const minimum = this.state.minimum;
    const category = this.state.category;
    
    axios.post(`${process.env.REACT_APP_API_URL}/api/offers`, {
       title, description, price, unity, minimum, category
      }, {withCredentials:true})
    .then( () => {
        this.props.getData();
        this.setState({title: "", description: "", price: "", unity: "", minimum: "", category: ""});
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }

  render(){
    return(
      <div>
      <p className="title">Add an Item</p>
        <form onSubmit={this.handleFormSubmit}>
        <div className="field">
          <label className="label">Title</label>
          <input className="input" type="text" name="title" value={this.state.title} onChange={ e => this.handleChange(e)}/>
          </div>

          <div className="field">
          <label className="label">Description</label>
          <textarea className="textarea" name="description" value={this.state.description} onChange={ e => this.handleChange(e)} />
          </div>

          <div className="field">
          <label className="label">Price</label>
          <input className="input" type="number" name="price" value={this.state.price} onChange={ e => this.handleChange(e)} />
</div>
<div className="field">
          <label className="label">Unity</label>
          <input className="input" type="text"  name="unity" value={this.state.unity} onChange={ e => this.handleChange(e)} />
      </div>
      <div className="field">
      <label className="label">Minimum</label>
          <input className="input" type="number" name="minimum" value={this.state.minimum} onChange={ e => this.handleChange(e)} />
      </div>
      <div className="field">
          <label className="label">Category</label>
          <div className="select">
          <select name='category' value={this.state.category} onChange={ e => this.handleChange(e)} >
            <option value="Fruits">Fruits</option>
            <option value="Flowers">Flowers</option>
            <option value="Fish">Fish</option>
            <option value="Vegetables">Vegetables</option>
            <option value="None of above">None of above</option>    
          </select>
        
          </div>
          </div>
          <div className="field is-grouped">
  <div className="control">
  <input className="button is-link" type="submit" value="Add New Item" />
  </div>
          </div>
        </form>
      </div>
    )
  }
}

export default AddOffer;