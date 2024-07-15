import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"


const initialState={
    tasksList:[],
    selectedTask:{},
    isLoading:false,
    error:''

}

//Get

export const getTasksFromServer=createAsyncThunk(
    'tasks/getTasksFromServer',
   async (_,rejectWithValue)=>{
        const response =await fetch("http://localhost:8000/tasks")
        if(response.ok){
            const jsonRespone=await response.json()
            return jsonRespone
        }else{
            return rejectWithValue({error:"No Task Found"})
        }
    }
)

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
           
          
    },

    extraReducers:(builder)=>{
        builder
        .addCase(getTasksFromServer.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getTasksFromServer.fulfilled,(state,action)=>{
            state.isLoading=false
            state.error=''
            state.tasksList=action.payload

        })
        .addCase(getTasksFromServer.rejected,(state,action)=>{
            state.isLoading=false
            state.error=action.payload.error
            state.tasksList=[]
        })
    }
})
export const {addTaskToList,removeTaskFromList,updateTaskList,setSelectedTask}=tasksSlice.actions
export default tasksSlice.reducer