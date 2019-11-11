import React from 'react';


class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
      }

    componentWillUnmount() {
    clearInterval(this.timerID);
    }

    tick(){
        this.setState({
            date: new Date()
        })
    }

    render(){
        return(
            <div>
                <h1>This is a clock</h1>
                <h2>Time is {this.state.date.toLocaleTimeString()}</h2>
            </div>
        );
    }
}

//when rendering a class component..
//in general, only one instance is created by react.
export default Clock;