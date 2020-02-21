import React from 'react';
import axios from 'axios'
import Card from './Card'
import './deck.css'

const API_URL="https://deckofcardsapi.com/api/deck"
class Deck extends React.Component{
    constructor(props){
        super(props);
        this.state={
            deck:null,
            drawn:[],
        }
        this.getCard=this.getCard.bind(this)
    }
    async componentDidMount(){
        var response= await axios.get(`${API_URL}/new/shuffle/`);
        this.setState(
            {
                deck:response.data,
            }
        )
    }
    async getCard(evt){
        let id= this.state.deck.deck_id;
        
        try {
            var cardUrl=`${API_URL}/${id}/draw/`;
        var cardRes=await axios.get(cardUrl);
        if(cardRes.data.success===false){
            throw new Error("No card Left");
        }
        
        let card= cardRes.data.cards[0];
        this.setState(
            st =>(
                {
                    drawn: [
                        ...st.drawn,
                        {id:card.code,
                        image: card.image,
                        name: `${card.value} of ${card.suit} `
                      }
                    ]
                }
            )
                
            
        );
            
    }
    catch (err){
        alert(err);
    }
        
        
        
    }
    render(){
        const cards=this.state.drawn.map(c=>(
            <Card image={c.image} name={c.name} key={c.id}></Card>
        
        )
);
        return         (
            <div>
            <h1 className="deck-title">
            Card Dealer
            </h1>
            <h2 className="deck-title">
                A little demo made with react
            </h2>
            <br/>
            
            <button onClick={this.getCard}>
                Get Card
            </button>
            <div className="deck-card-area">
            {cards}
            </div>
            
            
            </div>
        );
    }
}

export default Deck;
