import './App.css';
import { useEffect, useState } from 'react';
import Field from './Components/Field';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {getCurrencies} from './store/slice';
import {changeSelected1,changeSelected2,changeValue1,changeValue2,changeRate1,changeRate2} from './store/slice';

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getCurrencies())
    
  },[])


 let input1 = useSelector((state)=>state.inputValue1);
 let input2 = useSelector((state)=>state.inputValue2);
 let selected1 = useSelector((state)=>state.selected1)
 let selected2 = useSelector((state)=>state.selected2)


 let changeInput1 = (e)=>{
  let result = e.target.value/
  dispatch(changeValue1(e.target.value))
 }
 let changeInput2 = (e)=>{
  dispatch(changeValue2(e.target.value))
 }

 
 let changeSelec1 = (e) =>{
  console.log(e.target.value);
  dispatch(changeSelected1(e.target.value))
  let res = allCurrencies.find(el=>el.txt === e.target.value).rate;
  dispatch(changeRate1(res))

 }
 let changeSelec2 = (e) =>{
  dispatch(changeSelected2(e.target.value))
  let res = allCurrencies.find(el=>el.txt === e.target.value).rate;
  dispatch(changeRate2(res))
 }

 let allCurrencies = useSelector((state)=>state.allCurrencies)

  if(useSelector((state)=>state.allCurrencies)){
    let headerCur1 = allCurrencies.find(el=>el.txt === selected1).cc;
    let headerCur2 = allCurrencies.find(el=>el.txt === selected2).cc

    document.title = `${headerCur1} - ${headerCur2}`
    return(
        <div className='appWrapper'>
          <div className='window'>
            <div className='fieldWrapper'>
              <Field
               input={input1}
               changeInput={changeInput1}
               selected={selected1}
               changeSelected={changeSelec1} 
               allCurrencies={allCurrencies}
               />
              <Field
               input={input2}
               changeInput={changeInput2} 
               selected={selected2}
               changeSelected={changeSelec2}
               allCurrencies={allCurrencies}
               />
              </div>
          </div>
        </div>
    )
  }
 
}


export default App;
