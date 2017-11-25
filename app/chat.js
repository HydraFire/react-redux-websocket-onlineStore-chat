import main from '../main'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Visibility from 'material-ui/svg-icons/action/visibility';
import Visibility_off from 'material-ui/svg-icons/action/visibility-off';

import './style/style.css';
const style = {
  margin: 12
};
const onresize = function(e) {
   let height = e.target.outerHeight;
   
   let content = document.querySelector('.contacts-list')
   content.style.height = (height-370)+'px'
   console.log(content.scrollHeight/1.6)
   let res = setInterval(()=>{
                console.log(content.scrollTop)
                if(content.scrollTop != content.scrollHeight/1.6){
                    content.scrollTop = content.scrollHeight/1.6;
                    
                    clearInterval(res)
                }
            },50) 
   
   console.log(content.scrollTop)
}
window.addEventListener("resize", onresize);
//window.addEventListener("DOMContentLoaded",()=>{main.hendleGetChat()})
	
    var Contact = React.createClass({
        calc_date: function() {
            let dateString
            var monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

            let m = new Date(this.props.date)
            let r = new Date()
            let sym = r.getTime() - m
            if(!isNaN(sym)){
               // console.log('sym = '+sym)
                let fff = new Date(sym)
               // console.log('fff = '+fff)
                let day = fff.getDate() - 1
               // console.log('day = '+day)
                if(day < 7){
                    let hours = fff.getUTCHours()
                    let min = fff.getUTCMinutes()
                    day!=0?day = day+' дней ':day = '';
                    hours!=0?hours = hours+' часов ':hours = '';
                    min!=0?min = min+' минут назад':min = '';
                    dateString = day+hours+min
                 }else{
                    dateString = m.getUTCDate()+'.'+monthNames[m.getUTCMonth()]+'.'+m.getUTCFullYear()
                 }
             }else{
                dateString = ''
             }
            return dateString
        },
	            render: function() {
	                return (
	                    <li className="contact">
	                        <img className="contact-image" src={this.props.image} />
	                        <div className="contact-info">
                            <div onClick={()=>{main.hendlerDeleteMessage(this.props.id)}} className="contact-delete">x</div>
                            <div className="contact-date"> {this.calc_date()}&#160;&#160;&#160;</div>
	                            <div className="contact-name"> {this.props.name} </div>
                                
	                            <div className="contact-number"> {this.props.message} </div>
	                        </div>
	                    </li>
	                );
	            }
	        });
    
    var Chat = React.createClass({
        componentDidUpdate: function(){
                onresize({target:{outerHeight:window.outerHeight}})
        },
        componentDidMount: function(){
            let int = setInterval(()=>{
                if(main){
                    main.hendleGetChat()
                    //onresize({target:{outerHeight:window.outerHeight}})
                    clearInterval(int)
                }
            },50) 
        },
        handleMessageX: function(event) {
        	event.preventDefault();
        	console.log(event)
            let message = event.target.childNodes[0].value
            event.target.childNodes[0].value = '';
            
            main.hendlerMessageSend(this.props.zyStore[0].chat.options,message)

				//this.props.actions.send([window.name_user,message])
        },
        MessageRender: function(){
            let a = this.props.zyStore[0].chat.data
            let b = this.props.zyStore[0].chat.options
            /*
            if(this.props.zyStore[0].user){
            b.push({user:this.props.zyStore[0].user.userName, visibility:true})
            }
            */
            //console.log(a)
            a = a.map(v=>{
                
                
                //console.log(b)
                let mi = 0
                let vis = 0
                let userImg = ''
                  for(mi=0;mi<b.length;mi++){
                    //console.log(b[mi].user+' == '+v.name)
                    if(b[mi].user == v.name){
                        if(v.name == this.props.zyStore[0].user.userName){
                        //console.log(v.send_to)
                        if(v.send_to){
                        let hh = 0
                        v.send_to.forEach((j)=>{
                            b.forEach((zx)=>{
                                //console.log(j.user+' == '+zx.user)
                                if(j.user == zx.user&&j.visibility == zx.visibility){
                                    hh++
                                }
                            })
                            //console.log(hh)  
                            if(hh == v.send_to.length){
                              //console.log('Показывай')  
                              vis = 1
                              userImg = b[mi].img
                            }
                        })
                        }
                        }else{
                         //console.log(b[mi].visibility)
                         if(b[mi].visibility){ 
                             vis = 1
                             userImg = b[mi].img
                         }
                        }
                    }

                  }
                  //console.log(vis)
                  if(vis == 1){
                  return <Contact
                                key={v.id}
                                id={v.id}
                                name={v.name}
                                message={v.message}
                                date={v.time}
                                image={userImg}
                                />;
                  }
         })
            //console.log(a)
            return a
        },
        littlehendler(v){
            if(v){
                return <Visibility />
            }else{
                return <Visibility_off />
            }            
        },
        hendlerOnline(v){
        if(v){
            return (<span>online</span>)
        }
        },
        hendlerUserList(){
            let a = this.props.zyStore[0].chat.options.map((v,i)=>{
                if(v.user != this.props.zyStore[0].user.userName){
                return (
                        <div key={i}>
                            <img className="contact-image" src={v.img} width="60px" height="60px" />
                            {this.hendlerOnline(v.online)}
                            <RaisedButton onClick={()=>{main.hendlerVisibilityButton(v.user)}}  label={v.user} style={style} />
                            <IconButton onClick={()=>{main.hendlerVisibility(v.user)}}>
                                {this.littlehendler(v.visibility)}
                            </IconButton>

                        </div>
                     )
                }
            })
            return a
        },
        render: function() {
            return (
                <div className="page_conteiner">
                <div className="page">
                <div className="user">
                <audio src="" id="aska_audio"></audio>
                <div><h2>Все пользователи:</h2></div>
                { this.hendlerUserList()}

                </div>
                <div className="message">
                    <ul className="contacts-list" id="style-3">
                    
                        
                            
                           
                            {this.MessageRender()}
                           
                        

                    </ul>
                    
                    <form onSubmit={this.handleMessageX}>
                   		<textarea rows="10" cols="45" name="text" placeholder="Search..." className="search-field"/>
                   		<input type="submit" value="Отправить"/>
               		 </form>
                </div>
                </div>
                </div>
                );
            }
        });



export default connect(
state =>({
    zyStore: state
}),
dispatch => ({})
)(Chat);