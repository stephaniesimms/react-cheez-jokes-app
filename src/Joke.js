import React, { Component } from "react";
import './Joke.css'

class Joke extends Component {
    constructor(props) {
        super(props);
        this.state ={
            joke: this.props.joke,
            id: this.props.id,
            netScore: this.props.netScore
        }
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
    };
  // only render when this is true!
// shouldComponentUpdate(nextProps, nextState){
// return this.props.isLit !== nextProps.isLit
// }
handleUpVote(evt){
    evt.preventDefault();
    this.state.netScore += 1;
    this.props.thumbsUp(this.props.id, this.state.netScore);
}

handleDownVote(evt){
    evt.preventDefault();
    this.state.netScore -= 1;
    this.props.thumbsDown(this.props.id, this.state.netScore);
}

render() {
    const { id, joke, netScore } = this.props;
    return (
        <p id={id}>
            { joke }
            <a onClick={this.handleUpVote} >👍 </a>
            <a onClick={this.handleDownVote}>👎</a>
            <span style={{marginLeft:`10px`}}>Score: { netScore }</span>
        </p>
    )
}
}

export default Joke;