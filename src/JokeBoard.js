import React, { Component } from 'react';
import axios from 'axios';
import ls from 'local-storage'
import Joke from './Joke';
// import './JokeBoard.css'
// import './JokeBoard.css';

const BASE_API_URL = "https://icanhazdadjoke.com/";

export default  class JokeBoard extends Component {
  constructor(props) {
		super(props);
		this.state = { 
			jokes: [],
			loading: true
		};
		this.thumbsDown = this.thumbsDown.bind(this);
		this.thumbsUp = this.thumbsUp.bind(this);
		this.sortJokesScore = this.sortJokesScore.bind(this);
		this.generateNewJokes = this.generateNewJokes.bind(this);

	};

// find joke by id and update its score in store & update the local storage
thumbsUp(id, updatedScore){
	// console.log(updatedJoke)
	const updateJokes = this.state.jokes.map(joke => {
		if (joke.id === id) {
			return {...joke, netScore: updatedScore };
		}
		return joke
	})
	this.setState({ jokes: updateJokes });
	ls.set('joke', updateJokes);
}

// find joke by id and update its score in store & update the local storage
thumbsDown(id, updatedScore){
	const updateJokes = this.state.jokes.map(joke => {
		if (joke.id === id) {
			return {...joke, netScore: updatedScore };
		}
		return joke
	})
	this.setState({ jokes: updateJokes })
	ls.set('joke', updateJokes)

}
// generate 10 jokes
async generateNewJokes(){
	await this.setState({jokes: [], loading: true})
	console.log(this.state)
		let duplicateJokes = new Set();
		let jokes = [];
		
		while (this.state.jokes.length < 10) {
			const response = await axios.get(BASE_API_URL, {'headers': {"Accept": "application/json"}})
			let newJoke = {
				id: response.data.id,
				joke: response.data.joke,
				netScore: 0,
		}
		if (!duplicateJokes.has(newJoke)) {
			duplicateJokes.add(newJoke);
			this.state.jokes.push(newJoke);
		}
		this.setState({jokes: jokes, loading: false});
	}
}
//sort the jokes by height netScore first
sortJokesScore(){
	return this.state.jokes.sort((a,b) => (a.netScore < b.netScore)? 1 :(a.netScore === b.netScore)? ((a.size < b.size)? 1 : -1): -1)
}

// when component did mount get jokes from local storage
componentDidMount(){
	const jokes = ls.get('joke');
	console.log(jokes)

	this.setState({jokes: jokes, loading: false});
}

// generate html template for jokes
generateJokes(){
	return(
	<div>
		<h1> Please vote for jokes!</h1>
		<table>
  <tr>
    <th>Joke</th>
		<th>up</th>
		<th>down</th>
		<th>score</th> 

  </tr>
		{this.sortJokesScore().map( j =>
			<Joke 
			joke={j.joke}
			id={j.id}
			key={j.id}
			netScore={j.netScore}
			thumbsUp={this.thumbsUp}
			thumbsDown={this.thumbsDown}
			/>
			)}
		</table>
	
	</div>
	)
}

render(){
	return(
		<div>
			{this.state.loading ? <h1>Loading....</h1> : <div>{this.generateJokes()}</div>}
			<button onClick={this.generateNewJokes}> Give me new Jokes</button>
		</div>
	)
}
        
}
