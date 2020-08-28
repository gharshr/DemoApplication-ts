import React, { useState } from 'react';
import { todoNodeStructure } from './todoSlice';

function TodoNode(props : todoNodeStructure) {
    const [completed,updateStatus] = useState(props.completed);
    const [title,updateTitle] = useState(props.title);
    return (
        <div>
            <input type="checkbox" checked={completed} onChange={() => updateStatus(!completed)}/>
            <b>{props.title}</b>
        </div>
    )
}

export default TodoNode;