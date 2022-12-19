import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { current } from "@reduxjs/toolkit";

let init = {
   
    inputValue1:1,
    inputValue2:1,
    selected1:'Долар США',
    selected2:'Євро',
}

export const getCurrencies = createAsyncThunk(
    'currency/getCurrencies',
    async()=>{
        const response = await (await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')).data;
        response.push({"r030":20,"txt":"Гривня","rate":1,"cc":"UAH"})
        return response
    }
)

const slice = createSlice({
    name:'currency',
    initialState:init,
    reducers:{
        changeValue1(state,action){
            state.inputValue1 = action.payload
            state.inputValue2 = (current(state).rate1/current(state).rate2 * current(state).inputValue1).toFixed(4)
        },
        changeValue2(state,action){
            state.inputValue2 = action.payload
            state.inputValue1 = (current(state).rate2/current(state).rate1 * current(state).inputValue2).toFixed(4)
        },
        changeSelected1(state,action){
            state.selected1 = action.payload
        },
        changeSelected2(state,action){
            state.selected2 = action.payload
        },
        changeRate1(state,action){
            state.rate1 = action.payload
            state.inputValue2 = (current(state).rate1/current(state).rate2 * current(state).inputValue1).toFixed(4)
        },
        changeRate2(state,action){
            state.rate2 = action.payload
            state.inputValue2 = (current(state).rate1/current(state).rate2 * current(state).inputValue1).toFixed(4)
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getCurrencies.fulfilled,(state,action)=>{
            state.allCurrencies = action.payload
            state.rate1 = action.payload.find(el=>el.txt===current(state).selected1).rate
            state.rate2 = action.payload.find(el=>el.txt===current(state).selected2).rate
            state.inputValue2 = (current(state).rate1/current(state).rate2 * current(state).inputValue1).toFixed(4)
        })
    }
    
    
});

export default slice.reducer;
export const {changeSelected1,changeSelected2,changeValue1,changeValue2,changeRate1,changeRate2} = slice.actions;
