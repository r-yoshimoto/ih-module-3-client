import React, { Component } from 'react';
import Player from '../components/Player'
import Example from '../images/picture.png'
import Rodrigo from '../images/bio-1.png'
import Bruno from '../images/bio-2.png'

class Joc extends Component {

  render() {

    return (
<div>
<Player />
<div className="columns">
<div className="column is-one-fifth"></div>
<div className="column">
<div className="columns is-vcentered has-text-centered">
  <div className="column is-left has-text-left">
    <p className="title is-3">Your food stock in one click.</p>
    <p>We provide restaurants, farmers and curriers a innovative, easy and low cost way to offer, buy and deliver supplies.</p>
  </div>
  <div className="column"><img src={Example}></img></div>
</div>
</div>
<div className="column is-one-fifth"></div>
</div>

<div className="columns">
<div className="column is-one-fifth"></div>
<div className="column">
<div className="columns is-vcentered">
  
<div className="column is-one-fifth"><img src={Rodrigo}></img></div>
  <div className="column is-left has-text-left">
    <p className="title is-3">Rodrigo Yoshimoto</p>
    <p className="is-italic is-size-4">"We saw changes in the city and buying supplies for restaurants became a burden. We want to use technology to change this perception!"</p>
  </div>
</div>
</div>
<div className="column is-one-fifth"></div>
</div>

<div className="columns">
<div className="column is-one-fifth"></div>
<div className="column">
<div className="columns is-vcentered">
  
  <div className="column is-left has-text-left">
    <p className="title is-3">Bruno Bocchi</p>
    <p className="is-italic is-size-4">"We want to provide the best possible outcome for all three of our pilars. It's a win-win situation!"</p>
  </div>
  <div className="column is-one-fifth"><img src={Bruno}></img></div>
</div>
</div>
<div className="column is-one-fifth"></div>
</div>


<footer className="footer">
  <div className="content has-text-centered">
  <p className="title is-1">🍅<br/>Ceasa</p>
  <p><b>Let’s have a coffee!</b><br/>
            Alameda Jaú, 1301 - Jardim Paulista - São Paulo - SP, 01420-001</p>

    <p>
    Built with ❤ @ <a href="https://www.ironhack.com/br">Ironhack-SAO</a> as part
          of the Part-time WebDev Bootcamp!
    </p>
  </div>
</footer>

</div>
      )
    }
}


export default Joc;