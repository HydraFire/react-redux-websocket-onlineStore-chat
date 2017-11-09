import React,{Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Masonry from 'react-masonry-component';
import Note from './Note'
import './style/NotesGrid.css';
import main from '../main'

//import page0 from './page0';


const MasonryOptions = {
	itemSelector: '.Note',
	columnWidth: 5,
	horizontalOrder: true,
	gutter:10
}
class NotesGrid extends Component {
 componentDidMount(){
 	console.log(main)
 	setTimeout(()=>{
 		main.hendlerShopLoad()
 	},500)
 	
 }
  noterender(props){
		//this.props.myStore.map((v,i) =>{
		let arr_x = this.props.myStore[0].shop
			arr_x = arr_x.map((v,i) =>{
							return (<Note
							key={v.id}
							id={v.id}
							name={v.name}
							img={v.img}
							description={v.description}
							technical = {v.technical}
							like = {v.like}
							coments = {v.coments}
							color = {v.color}
							price = {v.price}
							></Note>)
						})
					
		console.log(' ww '+' ww '+' ww ')
		console.log(this.props.myStore[0].config)
		return arr_x
	}
	render(){
		return (
			<div>
				<Masonry
					className='NotesGrid'
					options={MasonryOptions}
				>
				{this.noterender()}
				</Masonry>
          	</div>
			);
	}
}

export default connect(
state =>({
	myStore: state
}),
dispatch => ({})
)(NotesGrid);
