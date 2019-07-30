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
shouldComponentUpdate(nextProps, nextState){
return this.props.netScore !== nextProps.netScore
}
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
        <tr id={id}>
            <th>{ joke } </th>
            <th><a onClick={this.handleUpVote} >  👍</a></th>
            <th><a onClick={this.handleDownVote}> 👎</a></th>
            <th><span style={{marginLeft:`10px`}}>{ netScore }</span></th>
        </tr>
    )
}
}

export default Joke;