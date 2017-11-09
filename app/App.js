import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home';
import page0 from './page0';
import Shop from './page1';
import page2 from './page2';
import Chat from './chat';
import './style/header.css';
//import './style/Oxygen_header.css';

//import NotesGrid from './NotesGrid';


//var Contact = React.createClass({
class App extends Component {
constructor(props){
  super(props);
  console.log(this.props.testStore)
/*
  let self = this
  const socket = new WebSocket("ws://localhost/index.html");
  socket.onopen = function() {
    console.log('SOCKET CONNECT')
  socket.onmessage = function(event) {
    console.log("Получены данные " + event.data);
    let arr = JSON.parse(event.data)
    console.log(arr)
    console.log('fdgghjghjghjg')
    self.setState({messages:arr});
    self.setState({data:test});
    };
  };
  this.state ={
    actions: socket,
    messages:[],
    data:[]
  }
  */
}
render() {
    return (
    <Router>
        <div>
        <link href='https://fonts.googleapis.com/css?family=PT+Sans+Narrow:400,700' rel='stylesheet' type='text/css'/>
        <link href='https://fonts.googleapis.com/css?family=PT+Sans:400,400italic,900' rel='stylesheet' type='text/css'/>
          <div id="header">
            <a href="/" id="logo">department</a>
            <ul id="menu">
              <li><a href="/"><span><Link to={'/'}>MAIn</Link></span></a></li>
              <li><a href="/"><span><Link to={'/page0'}>Noir</Link></span></a></li>
              <li><a href="/"><span><Link to={'/Shop'}>Shop</Link></span></a></li>
              <li><a href="/"><span><Link to={'/page2'}>HydraFire</Link></span></a></li>
              <li><a href="/"><span><Link to={'/page1'}>Contact</Link></span></a></li>
            </ul>
            </div>
          <hr />
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/page0' component={page0 } />
              <Route path='/Shop' render={() => (
                <Shop/>
              )}/>
              <Route path='/page2' render={() => (
                <Chat/>
              )}/>
              

          </Switch>
          
          
        </div>
      </Router>
    );
  }
}

export default connect(
  state => ({
     testStore: state
  }),
  dispatch =>({})
  )(App);
