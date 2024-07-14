import { createSlice } from "@reduxjs/toolkit"


const initialState={
    tasksList:[],
    selectedTask:{}
}

const tasksSlice=createSlice({
    name:"tasksslice",
    initialState,
    reducers:{
        addTaskToList:(state,action)=>{
            const id=Math.random()*100
            let task={...action.payload,id}
            state.tasksList.push(task)
        },
        removeTaskFromList:(state,action)=>{
            state.tasksList=state.tasksList.filter((task)=>task.id!==action.payload.id)
            },
            updateTaskList:(state,action)=>{
            state.tasksList=state.tasksList.map((task)=> task.id === action.payload.id ? action.payload :task)
            },
            setSelectedTask:(state,action)=>{
                state.selectedTask=action.payload
            }
           
          
    }
})
export const {addTaskToList,removeTaskFromList,updateTaskList,setSelectedTask}=tasksSlice.actions
export default tasksSlice.reducer