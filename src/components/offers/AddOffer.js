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
       category: "",
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
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input type="text" name="title" value={this.state.title} onChange={ e => this.handleChange(e)}/>
          <label>Description:</label>
          <textarea name="description" value={this.state.description} onChange={ e => this.handleChange(e)} />
          <label>Price:</label>
          <input type="number" name="price" value={this.state.price} onChange={ e => this.handleChange(e)} />
          <label>Unity:</label>
          <input type="text"  name="unity" value={this.state.unity} onChange={ e => this.handleChange(e)} />
          <label>Minimum:</label>
          <input type="number" name="minimum" value={this.state.minimum} onChange={ e => this.handleChange(e)} />
          <label>Category:</label>
          <select name='category' value={this.state.category} onChange={ e => this.handleChange(e)} >
            <option value="Fruits">Fruits</option>
            <option value="Flowers">Flowers</option>
            <option value="Fish">Fish</option>
            <option value="Vegetables">Vegetables</option>
            <option value="None of above">None of above</option>    
          </select>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default AddOffer;