import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzas',async (params,thunkAPI)=>{
        const {
            order,
            category,
            sortBy,
            searchValue,
            currentPage
        } = params

        const {data} = await axios.get(
        `https://630e6210109c16b9abfa526d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${order}&order=${sortBy}&search=${searchValue}`
    )
        return data
    }
)

const initialState={
    items:[],
    status:''
}

export const pizzaSlice=createSlice({
    name:'pizza',
    initialState,
    reducers:{
        setItems(state,action){
            state.items = action.payload;
        },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status='loading';
            state.items =[];
        },
        [fetchPizzas.fulfilled]: (state,action) => {
            state.items = action.payload;
            state.status='success';
        },
        [fetchPizzas.rejected]: (state) => {
            state.status='error';
            state.items =[];
        },

    },
})

export const {setItems}=pizzaSlice.actions

export default pizzaSlice.reducer