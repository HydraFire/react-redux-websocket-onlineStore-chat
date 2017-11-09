import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import main from '../main'
import Chat from './chat'
import './style/shop_tovar_page.css';

class Dashboard extends Component {
  
  constructor(props){
  super(props);
  let text = props.location.hash
  if(text!=''){
  text = text.substring(1,text.length)
  text = JSON.parse(text)
  //let socket = props.location.actions

  console.log(text)
  this.state = {note:text}
  console.log(props)
    }else{
  this.state = {note:{
    img:'',
    name:'',
    price:'',
    technical:'',
    description:''
  }}
    }
  }
  hendleLike(e){
    main.hendleShopLike(e)
  }
  render() {
    return (
        <div className="page_conteiner">
         <div className="page">
            <h1>{this.state.note.name}<br /><br /><img src={this.state.note.img}/> <strong>{this.state.note.price}</strong>.</h1>
  			     <p>{this.state.note.description}</p>
             <RaisedButton label="Like 👍" onClick={()=>{this.hendleLike(this.state.note.name)}} />
          	<h1><strong>{this.state.note.technical}{this.state.note.like}{this.state.note.coments}</strong>.</h1>
          	 </div>
            <hr/>
            <br/>
            <hr/>
            <br/>
            <Chat/>
            <hr/>
            <br/>
        </div>
    );
  }
}

export default Dashboard;
