import React, { Component } from 'react';
import { connect } from 'react-redux';
import main from '../main'
import NotesGrid from './NotesGrid';
import ShopAddForm from './ShopAddForm';
import RaisedButton from 'material-ui/RaisedButton';
import './style/Home.css';

const style = {
  margin: 12
};

class Shop extends Component {
  swicher(props){
  console.log(this.props.mynewStore[0].config.shop_add)
    if(this.props.mynewStore[0].config.shop_add){
        return <NotesGrid/>
    }else{
        return (<div>
                    <ShopAddForm/>
                    <NotesGrid/>
                </div>)
    }
   }
   
  hendler(props){
  
  console.log(props.mynewStore[0].config)
  main.hendlerAddButton()
   // props.mynewStore.dispatch({type: 'ADD_TRACK', payload:[]})
  }
  render() {
    return (
        <div className="page_conteiner">
        <div className="page">
           <h1>Панель настроек
          
           <RaisedButton onClick={()=>{this.hendler(this.props)}} label="ADD" primary={true} style={style} />
           <br />
           </h1>
            {this.swicher(this.props)}
            
            
            
            </div>
        </div>
    );
  }
}

export default connect(
state =>({
    mynewStore: state
}),
dispatch => ({})
)(Shop);
