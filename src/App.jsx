import { useState } from 'react'
import { Squircle } from "@squircle-js/react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {DragDropProvider} from '@dnd-kit/react';
import TaskForm from './TaskForm'
import missing from './assets/missing.png'
import './App.css'
import TaskItem from './TaskItem'

function App() {
  const [IsFormOpen, setIsFormOpen] = useState(false)
  const [tasks, setTasks] = useState([])
  const [dragDisabled, setDragDisabled] = useState(false)

  function handleAddTask(task){
    setTasks(prevTasks => [...prevTasks, task])
  }

  function handleDragEnd(event, scale) {
    setDragDisabled(false);

    if (event.cancelled) return;
    const { source, position } = event.operation;
    if (!source) return;

    const deltaX = (position.current.x - position.initial.x)/scale;
    const deltaY = (position.current.y - position.initial.y)/scale;

    

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        String(task.id) === String(source.id)
          ? {
              ...task,
              x: task.x + deltaX,
              y: task.y + deltaY,
            }
          : task
      )
    );
  }

  return (
    <>
      <button
      className="add-task-button"
      aria-label="Create new task"
      onClick={() => setIsFormOpen(true)}
      >
        +
      </button>

      <header
      className="header"
      >
        <img src={missing} 
        className="logo" width="60" height="60" alt="Logo"/>

        <Squircle
        className = "login-button"
        onClick={() => console.log("Login clicked")}
        cornerRadius={30}
        cornerSmoothing={0.3}>
          Log in
        </Squircle>

        <Squircle
        className = "sign-up-button"
        onClick={() => console.log("Signup clicked")}
        cornerRadius={30}
        cornerSmoothing={0.9}>
          Sign up
        </Squircle>
      </header>

      {IsFormOpen && 
        <TaskForm 
        onClose={()=>setIsFormOpen(false)}
        onAddTask={(task)=>handleAddTask(task)}/>}


      <TransformWrapper
      initialScale={1}
      minScale={.25}
      maxScale={3}
      centerOnInit={false}
      wheel={{
        step: .0005
      }}
      panning={{ disabled: dragDisabled, 
        excluded: ["task-item"]
       }}
      >
        {({state})=>(
        <TransformComponent
        wrapperStyle={{
          width: "100%", 
          height: "calc(100vh - 65px)",
          marginTop: "65px",
          overflow: "hidden"
        }}
        contentStyle={{
          width: "2000px", 
          height: "2000px"
        }}>
          <DragDropProvider   
          onDragStart={()=>setDragDisabled(true)}
          onDragEnd={(event)=>handleDragEnd(event, state.scale)}
          >
            <div className="task-workspace">
              {tasks.map((task) => (
                <TaskItem 
                key={task.id}
                id={task.id}
                name = {task.name}
                dueDate = {task.dueDate}
                x = {task.x}
                y = {task.y}
                />
              ))}

            </div>  
          </DragDropProvider>
        </TransformComponent>
        )}
      </TransformWrapper>
    </> 
  )
}

export default App
