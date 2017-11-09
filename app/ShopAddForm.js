import React, { Component } from 'react';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import main from '../main'
//import './style/Home.css';
const styles = {
  button: {
    margin: 12,
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};


const Shop = React.createClass({
  handleSearch: function(event) {
          event.preventDefault();
          //const socket = new WebSocket("ws://localhost/index.html");
          console.log('zzzzzzzzzzzzzzzzz')
          console.log(event.target.childNodes[0].childNodes[1].value)
            let obj = {
              name:event.target.childNodes[0].childNodes[1].value,
              price: event.target.childNodes[1].childNodes[1].value,
              description: event.target.childNodes[2].childNodes[1].value,
              technical: event.target.childNodes[3].childNodes[1].value
            }
            event.target.childNodes[0].childNodes[1].value = '';
            event.target.childNodes[1].childNodes[1].value = '';
            event.target.childNodes[2].childNodes[1].value = '';
            event.target.childNodes[3].childNodes[1].value = '';
           
            let sendObj = {
              type:'ADD_TO_SHOP',
              data:obj
            }
             console.log(sendObj)
            main.hendlerAddShop(sendObj)

            //socket.send(JSON.stringify(sendObj))
            //this.props.actions.send([window.name_user,message])
  },
  render() {
    return (
        <div className="page_conteiner">
        <div className="page">
           <h1>Добавляем новый товар<br /></h1>
			     <form onSubmit={this.handleSearch}>
                      <TextField id="email" floatingLabelText="ИМЯ ТОВАРА :" type="text" className="search-field"/>
                   
                      <TextField id="email" floatingLabelText="Цена :" type="text" className="search-field"/>
                     
                      <TextField id="email" floatingLabelText="Описание :" type="text" className="search-field"/>
                     
                      <TextField id="email" floatingLabelText="Технические параметры :" type="text" className="search-field"/>
                      <h1><strong></strong></h1>
                      <RaisedButton
                        label="Прикрепить Фотографии"
                        labelPosition="before"
                        style={styles.button}
                        containerElement="label"
                      >
                        <input type="file" style={styles.exampleImageInput} />
                      </RaisedButton>
                      <RaisedButton type="submit" label="Отправить" primary={true} style={styles} />
                  
           </form>
            </div>
        </div>
    );
  }
})

export default Shop;