import React from 'react';
import './card.css'
class Card extends React.Component{
    constructor(props){
        super(props);
        let angle=Math.random()*90-45;
        let xPos=Math.random()*40-20;
        let yPos=Math.random()*40-20;
        this._transform=`translate(${xPos}px,${yPos}px)rotate(${angle}deg)`    
    }
    render(){
        return (<div>
            <img className='card'style={{transform: this._transform}}src={this.props.image} alt={this.props.name}/>
        </div>);
    }
}

export default Card;