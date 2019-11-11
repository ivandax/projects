import React from 'react';
import './CreateToDo.css';

class CreateToDo extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            placeholder : 'Type your ToDo here...',
            inputValue : ''
          }
    }

    /*when we do submit the form, only then we pass the current state of inputValue
    to the function sent by props from the parent App.js*/
    handleSubmit = (event) => {
        event.preventDefault();//prevents the form of reloading the page

        const val = this.state.inputValue; //in this way, we always have access to the latest input through state.
        this.props.returnText(val);//prop function from App.js
        this.setState({inputValue: ''}); //reset the state with empty string to clear input, once we have submitted.
    }

    /*This function sets the new stage every time we type into input... the input is a controlled 
    component... every time we type, we are updating the state of inputValue, and that appears on screen*/
    handleChange = (event) => {
        const val = event.target.value;
        this.setState({inputValue:val})
        //console.log(val); with this we can dynamically see each letter input on the console... uncomment to see :)
    }

    render(){
        //console.log(this.state)
        return(
            <form className="CreateToDo" method="" onSubmit={this.handleSubmit} >
                <input type="text" ref="input" placeholder={this.state.placeholder} className="text" value={this.state.inputValue} onChange={this.handleChange}/>
                <input className="button" type="submit"/>
            </form>
        )
    }
}


export default CreateToDo;

