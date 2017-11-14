import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar'
import main from '../main';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
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

const Home = React.createClass({
  hendlerForm: function(event) {
  event.preventDefault();
          //console.log(event.target.childNodes[0].childNodes[1].value)
            let obj = {
              name:event.target.childNodes[0].childNodes[1].value,
              password: event.target.childNodes[1].childNodes[1].value
            }
            event.target.childNodes[0].childNodes[1].value = '';
            event.target.childNodes[1].childNodes[1].value = '';
           
            let sendObj = {
              type:'FORM_TO_LOGIN',
              data:obj
            }
             console.log(sendObj)
            main.hendlerLogin(sendObj)
  },
  hendlerFormReg: function(event) {
  event.preventDefault();
          //console.log(event.target.childNodes[0].childNodes[1].value)
            let obj = {
              name:event.target.childNodes[0].childNodes[1].value,
              mail: event.target.childNodes[2].childNodes[1].value,
              password:event.target.childNodes[4].childNodes[1].value,
              password_retry:event.target.childNodes[6].childNodes[1].value
              //img:event.target.childNodes[7].childNodes[1].value
            }
            event.target.childNodes[0].childNodes[1].value = '';
            event.target.childNodes[2].childNodes[1].value = '';
            event.target.childNodes[4].childNodes[1].value = '';
            event.target.childNodes[6].childNodes[1].value = '';
           //console.log(obj)
            let sendObj = {
              type:'FORM_TO_REG',
              data:obj
            }
             console.log(sendObj)
            main.hendlerRegistration(sendObj)
  },
  imageRender(){
    var avatarInput = document.querySelector('.input')
    let img = document.querySelector('.prewImg')
    img.src = window.URL.createObjectURL(avatarInput.files[0])
  },
  eventListenerInput(){
    var avatarInput = document.querySelector('.input')
    // let img = document.querySelector('.prewImg')
    // img.src = this.props.newStore[0].user.options.img
    console.log('put')
    console.log(avatarInput)
    if(avatarInput){
      console.log(avatarInput.files[0])
      avatarInput.addEventListener('change',this.imageRender)
    }
  },
  hendlerFormAvatar(event){
  event.preventDefault();
  var file = event.target.childNodes[0].files[0]
  console.log(event.target)
  console.log(file.size)
  if(file.size < 2000000){
    main.avatarSend(file)
  }
/*
    let obj = {
      fileName:event.target.childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[1].files[0].name,
      img:file
    }
   */
   //console.log(obj)
  },
  hendlerReg(props){
    main.hendlerFormRegistration()
  },
  handlerLogin_false(){
   if(this.props.newStore[0].config.options.login_false){
    return (<div>Неправельный логин или пароль</div>)
   }
  },
  swicher(props){
  console.log(this.props.newStore[0].config.login)
  console.log(this.props.newStore[0].config.registration)
  console.log(this.props.newStore[0].config.options)
    if(this.props.newStore[0].config.login){

        return (<div>
                 <AppBar title={this.props.newStore[0].user.userName}/>

                 <RaisedButton label="admin option" disabled={true} style={styles.button} />
                 <RaisedButton label="option" disabled={true} style={styles.button} />
                 <RaisedButton onClick={()=>{main.hendlerLog_out()}}label="sing-out" secondary={true} style={styles.button} />
                 
                 <RaisedButton
                        label="Изменить аватарку"
                        labelPosition="before"
                        style={styles.button}
                        containerElement="label">
                        <form onSubmit={this.hendlerFormAvatar}>
                        <input onClick={this.eventListenerInput} className="input" type="file" style={styles.exampleImageInput} />
                      
                        <img className="prewImg" src={this.props.newStore[0].user.options.img}/>
                        <input type="submit" value="Применить" style={styles.button} />
                        </form>
                  </RaisedButton>
                 
               
               </div>)
    }else{
      if(this.props.newStore[0].config.registration){
        return (<div>
                 <AppBar title="REGISTRATION"/>
                 <form onSubmit={this.hendlerFormReg}>
                 <TextField id="login" floatingLabelText="NAME:" type="text" className="search-field"/>
                 <p/>
                 <TextField id="login" floatingLabelText="Mail :" type="text" className="search-field"/>
                 <p/>
                 <TextField id="passwordd" floatingLabelText="PASSWORD :" type="password" className="search-field"/>
                 <p/>
                 <TextField id="passwordd" floatingLabelText="retry PASSWORD :" type="password" className="search-field"/>
                 <p/>
                 <RaisedButton type="submit"  label="registration" primary={true} style={styles.button} />
                 </form>
               </div>)
       }else{
          return (<div>
                 <AppBar title="Login to Admin"/>
                 {this.handlerLogin_false()}
                 
                 <form onSubmit={this.hendlerForm}>
                 <TextField id="login" floatingLabelText="LOGIN :" type="text" className="search-field"/>
                 <TextField id="passwordd" floatingLabelText="PASSWORD :" type="password" className="search-field"/>
                 <RaisedButton type="submit" label="sing-in" style={styles.button} />
                 </form>
                 <RaisedButton onClick={()=>{this.hendlerReg(this.props)}} label="registration" primary={true} style={styles.button} />
               </div>)
       }
      }
                
                
    
   },
  render() {
    return (
        <div className="page_conteiner">
        <div className="page">
          <h1>Главная страница<br />
          {this.swicher(this.props)}
          
          
          
          
          
          
          <br />
          <br />
          <RaisedButton label="Full width" fullWidth={true} />
          <br/><strong>Новость 02</strong>.</h1>
          <p>Soon the crew came on <a href="#">board in twos and threes</a>; the riggers bestirred themselves; the mates were actively engaged; and several of the shore people were busy in bringing various last things on board. Meanwhile Captain Ahab remained invisibly enshrined within his cabin.</p>
        	
          <h1><strong>Новость 08</strong>.</h1>
        	<p>Soon the crew came on <a href="https://nerv.pro">Aska</a>; the riggers bestirred themselves; the mates were actively engaged; and several of the shore people were busy in bringing various last things on board. Meanwhile Captain Ahab remained invisibly enshrined within his cabin.</p>
        	<p>Having achieved immortality, the celebrated writer turned his genius toward the more difficult problem of paying taxes.</p>
        	<p>Having achieved immortality, the celebrated writer turned his genius toward the more difficult problem of paying taxes.</p>
        	<p>Having achieved immortality, the celebrated writer turned his genius toward the more difficult problem of paying taxes.</p>
        	<p>Having achieved immortality, the celebrated writer turned his genius toward the more difficult problem of paying taxes.</p>
        	<p>Having achieved immortality, the celebrated writer turned his genius toward the more difficult problem of paying taxes.</p>
        	
          <h1><strong>Новость 00</strong>.</h1>
        	<p>Поздравляю всех с запуском портала <a href="https://nerv.pro">Aska</a>; the riggers bestirred themselves; the mates were actively engaged; and several of the shore people were busy in bringing various last things on board. Meanwhile Captain Ahab remained invisibly enshrined within his cabin.
        	Soon the crew came on <a href="https://nerv.pro">Aska</a>; the riggers bestirred themselves; the mates were actively engaged; and several of the shore people were busy in bringing various last things on board. Meanwhile Captain Ahab remained invisibly enshrined within his cabin.</p>
        	</div> 
          <hr/>
          <br/>
          <hr/>
         	<br/>
         	<hr/>
         	<br/> 
        </div> 
    );
  }
});

export default connect(
state =>({
    newStore: state
}),
dispatch => ({})
)(Home);