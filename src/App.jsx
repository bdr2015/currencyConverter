import './App.css';
import { useEffect, useState } from 'react';
import Field from './Components/Field';
import axios from 'axios';

function App() {
  const [inputValue1, changeInputValue1] = useState(0)
  const [inputValue2, changeInputValue2] = useState(0)
  const [selected1 ,changeSelected1] = useState('Долар США')
  const [selected2 ,changeSelected2] = useState('Євро')
  const [allCurrencies, getCurrencies] = useState()

  useEffect(()=>{
    axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json').then((res)=>{
      let curr = res.data;
      curr.push({'txt':'Гривня', 'rate':1,'r030':'001', 'cc':'UAH'})
      getCurrencies(curr)

    })

  },[]);


  const changeValue1 = (e)=>{
    changeInputValue1(e.target.value)
    changeInputValue2((allCurrencies.find((el)=>el.txt === selected1).rate/ allCurrencies.find((el)=>el.txt === selected2).rate * e.target.value).toFixed(3) )
  }
  const changeValue2 = (e)=>{
    changeInputValue2(e.target.value)
    changeInputValue1((allCurrencies.find((el)=>el.txt === selected2).rate/ allCurrencies.find((el)=>el.txt === selected1).rate * e.target.value).toFixed(3) )
  }


  const changeSelec1 = (e)=>{
    changeSelected1(e.target.value)
    changeInputValue2((allCurrencies.find((el)=>el.txt === selected1).rate/ allCurrencies.find((el)=>el.txt === selected2).rate * inputValue1).toFixed(3))
  }
  const changeSelec2 = (e)=>{
    changeSelected2(e.target.value)
    changeInputValue1((allCurrencies.find((el)=>el.txt === selected2).rate/ allCurrencies.find((el)=>el.txt === selected1).rate * inputValue2).toFixed(3))
  }



  if(allCurrencies){
    document.title = `${allCurrencies.find((el)=>el.txt === selected1).cc} - ${allCurrencies.find((el)=>el.txt === selected2).cc} `
    return(
        <div className='appWrapper'>
          <div className='window'>
            <div className='fieldWrapper'>
              <Field
                allCurrencies ={allCurrencies}
                inputValue = {inputValue1}
                changeValue = {changeValue1}
                selected = {selected1}
                changeSelected = {changeSelec1}
                />

              <Field
                allCurrencies ={allCurrencies}
                inputValue = {inputValue2}
                changeValue = {changeValue2}
                selected = {selected2}
                changeSelected = {changeSelec2}

                />
              </div>
          </div>
        </div>
    )
  }
 
}


export default App;
