import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';


const Card = (props) => {
    return (
        <div id="div1">
            <img width="75" src={props.avatar_url} />
            <div id="div2">
                <div id="div3">
                    {props.name}
                </div>
                {props.company}
            </div>
        </div>
    )
}

const CardList = (props) => {
    return (
        <div>
            {props.cards.map(card => <Card key={card.id} {...card} />)}
        </div>
    )
}

class Form extends React.Component {
    state = {
        userName: ''
    };
    handleSubmit = (event) => {
        event.preventDefault();
        axios.get(`https://api.github.com/users/${this.state.userName}`)
            .then(results => {
                console.log(results.data);
                this.props.onSubmit(results.data);
                this.setState({userName: ''});
            })
            .catch(err => {
                console.error(err);
            })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text"
                    value={this.state.userName} 
                    onChange={(event) => { this.setState({ userName: event.target.value }) }}
                    placeholder="Github User" />
                <button type="submit">Add card</button>
            </form>
        )
    }
}

class App extends React.Component {
    state = {
        cards: []
    }

    addNewCards = (cardInfo) => {
        this.setState((prevState) => ({
            cards: prevState.cards.concat(cardInfo)
        }));
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.addNewCards}/>
                <CardList cards={this.state.cards} />
            </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('root'));