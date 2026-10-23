import { useState } from 'react';
import { Squircle } from "@squircle-js/react";



function TaskForm({onClose, onAddTask}){
    const [name, setName] = useState('New task')
    const [dueDate, setDueDate] = useState('')

    function handleSubmit(event){
        event.preventDefault();

        onAddTask({name, dueDate, x:0, y:100, id:crypto.randomUUID()});

        

        onClose();
    }

        return (
            <form onSubmit={handleSubmit}
            className="task-form">

                <button 
                type="button" 
                onClick={()=>onClose()}
                className='xButton'>
                    X
                </button>

                <input 
                type="text"
                value={name}
                onChange={(event)=>{setName(event.target.value)}}>
                </input>

                <input
                type="date"
                value={dueDate}
                onChange={(event)=>{setDueDate(event.target.value)}}>
                </input>

                <Squircle
                asChild
                cornerRadius={20}
                cornerSmoothing={0.9}>
                    <button
                    type="submit"
                    className = "confirm-button">
                        Confirm
                    </button>
                </Squircle>

            </form>
        );
}



export default TaskForm