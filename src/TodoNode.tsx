import React, { useState, Dispatch, SetStateAction } from 'react';
import { todoNodeStructure } from './todoSlice';

interface props extends todoNodeStructure {
    updateToDoTitle : any,
    updateId : any
}

function TodoNode(props : props ) {
    //console.log(rest)
    const [completed,updateStatus] = useState(props.completed);
    const [title,updateTitle] = useState(props.title);
    return (
        <div>
            <input type="checkbox" checked={completed} onChange={() => updateStatus(!completed)}/>
            <b>{props.title}</b>
            <button type="button" onClick={() => { props.updateToDoTitle(title); props.updateId(props.id); (document.getElementById('edit_todo_input') as HTMLInputElement).disabled = false; (document.getElementById('edit_todo_button') as HTMLButtonElement).disabled = false}  }>Edit</button>
        </div>
    )
}

export default TodoNode;