import React from 'react';
//import logo from './logo.svg';
import './App.css';

import CreateToDo from './components/CreateToDo'
import ToDoList from './components/ToDoList'
//import Clock from './components/sampleClock'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items : [] //we will fill this out later
    }
  }

  //function to update an element of the state object.
  returnText = (text) => {
    //we receive the input from CreateToDo and we
    if(text.length>0){
      const copyOfItems = [...this.state.items] //make a copy of the state
      const data = {};
      const index = this.state.items.length //this makes an unique index (we never discard from array... we just shift to display false)
      data.id = index; //set the new properties of the object... 
      data.content = text;
      data.display = true; //by default, when creating the toDo item, display = true
      copyOfItems[copyOfItems.length] = data; //now we add the new object to the end of the array
      //set state with the new data
      this.setState((state)=>{
        return {items : copyOfItems} //finally we set the state with the mutate copy of the items array...
      });     //set state is key because it forces a new rendering of the to do list, without this, the screen won't change.
    }
  }

  //this is triggered when the child "ToDo" has the "trash" button clicked...
  getIdToRemove = (id) => {
    const copyOfItems = [...this.state.items] //similar mechanic,, make a copy of items
    copyOfItems[id].display = false; //change the selected element of array to its property display=False
    this.setState((state)=>{
      return {items : copyOfItems} //set state to re-render...
    });
  }

  //this occurs once when opening the app, go to local storage and retrieve the state.
  componentDidMount = () => {
    const localStorageRef = localStorage.getItem("todolist");
    console.log(localStorageRef);

    if(localStorageRef){
      this.setState((state)=>{
        return {items : JSON.parse(localStorageRef)} //set state to re-render...
      })
    }
  }
  
  //using local storage to keep track of the state :)
  componentDidUpdate = () => {
    console.log("component did update executed")
    console.log(this.state)
    localStorage.setItem("todolist",JSON.stringify(this.state.items))
  }

  render(){
    console.log("rendering app.js", this.state.items)
    return (
      <div className="main">
          {/*we pass the parent's update function as a prop to child*/}
        <h3>To Do List</h3>
        <CreateToDo returnText={this.returnText}/> 
        <ToDoList data={this.state.items} retrieveId={this.getIdToRemove}/>
      </div>
    );
  }
}

export default App;
