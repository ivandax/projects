import React from 'react';
import ToDo from '../ToDo'
import './ToDoList.css';

//function to filter an array based on the provided id of the element we want to remove...
// const filterArray = (array,id) => {
//     const filtered = array.filter(item =>{
//         return array.indexOf(item) !== id;
//     })
//     return filtered;
// }

class ToDoList extends React.Component{
    constructor(props){
        super(props);
    }

    /*if we want to remove an item from the list, the initiative comes from the parent, in this case ToDoList*
    /*We will create a method that can be passed as a prop to the child toDo, so it can be removed...*/

    removeToDo = (id) => {
        this.props.retrieveId(id); //the prop function comes from the parent and we need to send it all the way down to the child
    }

    render(){
        const {data} = this.props; //destructuring
        return(
            <div className="ToDoList">
                {data.map( item => {
                    if(item.display){ //only render those that have display=true
                        return <ToDo key={item.id} id={item.id} content={item.content} removeToDo ={this.removeToDo}/>
                    }
                })}
            </div>
        )
    }
}

export default ToDoList;

