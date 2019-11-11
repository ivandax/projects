import React from 'react';
import './ToDo.css';

class ToDo extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            myColorClass : ''
            //myId : this.props.id
        }
    }

    markAsDone = () => {
        //changes the state when clicking done.
        this.setState({myColorClass:'Green'})
    }

    //This will handle the event of clicking on trash... we will get the id of my instance of ToDo, and pass it
    //to our parent ToDolist... so he can remove us from the data array and rerender the list...
    returnMyId = () => {
        const id = this.props.id; //selects the id of the component, we set it up when mounting it and it never changes.
        this.props.removeToDo(id); //with this, we pass the id to the parent.
    }

    render(){
        return(
            <div className={`toDo ${this.state.myColorClass}`}>
                <div id={this.props.id}>{this.props.content}</div>
                <button className="doneButton" onClick={this.markAsDone}>Done</button>
                <button className="trashButton" onClick={this.returnMyId}>Trash</button>
            </div>
        )
    }
}

export default ToDo;