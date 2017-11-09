import React,{Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './style/Note.less'
import page2 from './page2';
import page0 from './page0';



var Note = React.createClass({
	
  	/*	
	hendleClick(event){
		     console.log(this.props.actions)
		     window.use = this.props.id
		     window.name_user = 'lol'
		     let message = 'работает'
		     this.props.actions.send([window.name_user,message])
		      
		      //this.setState(this.props)
			},
	*/
	render() {
		const style = { backgroundColor: this.props.color };
		var zapros = {
			name:this.props.name,
			img:this.props.img,
			price:this.props.price,
			description:this.props.description,
			technical:this.props.technical,
			like:this.props.like,
			coments:this.props.coments
		}
		zapros = JSON.stringify(zapros)
        let z = this
		return (
			<Link to={{
 				pathname: '/page0',
  				hash: zapros
			}}>
			<div onClick={this.hendleClick} className='Note'   style={style}>
			
			<Route path='/page0' render={() => (
                <page0 />
              )}/>
				<span className='Note__del-icon' > x </span>
				{
					this.props.name
					?
						<h4 className='Note__title'>{this.props.name}</h4>
					:
						null

				}
				
				<img className='Note__img' src={this.props.img}/>
				<div className='Note__text'><h4>{this.props.price} 👍 {this.props.like} ✉ {this.props.coments}</h4></div>
			</div>
			</Link>
		)
	}


})
export default Note;