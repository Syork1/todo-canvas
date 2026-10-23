import { Squircle } from "@squircle-js/react";
import {useDraggable} from '@dnd-kit/react';

function TaskItem({id, name, dueDate, x, y}){

    const {ref, isDragging} = useDraggable({
        id
    });

    return(
        <div
        ref={ref}
        className = {`task-item ${isDragging ? "is-dragging" : ""}`}
        style={{
                position: "absolute",
                left: x, 
                top: y,}}>
            <Squircle
            cornerRadius={20}
            cornerSmoothing={0.9}>
                <div className="task-content">
                    <h3>{name}</h3>
                    <p>{dueDate}</p>
                </div>
            </Squircle>
        </div>
    );
}

export default TaskItem