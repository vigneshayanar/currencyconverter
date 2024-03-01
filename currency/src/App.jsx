import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
 const [amount,setamount]=useState(1);
 const[fromcurrency,setfromcurrency]=useState("USD")
 const[tocurrency,settocurrency]=useState("INR")
 const[exchange,setexchange]=useState(null)
 const[convert,setconverted]=useState(null)
 const handlefrom=(e)=>{
  setfromcurrency(e.target.value)
 }
 const handleto=(e)=>{
  settocurrency(e.target.value)
 }
 const handleamount=(e)=>{
  const value=parseFloat(e.target.value)
  setamount(isNaN(value)?0:value);
 }
 useEffect(()=>{
  if(exchange!==null){
    setconverted((amount * exchange).toFixed(2));
  }
},[amount,exchange]);

 useEffect(()=>{
  const getexchange=async()=>{
  try{
  let url =`https://api.exchangerate-api.com/v4/latest/${fromcurrency}`
  const res=await axios.get(url)
  setexchange(res.data.rates[tocurrency])
  console.log(res)
  }
  catch(error){
    console.error("error",error)
  }};
  getexchange();
},[fromcurrency,tocurrency]);


 return (
    
      <div className='currencymain'>
        <div className='data'>
        <div className='box'></div>
          <h1>currency converter</h1>
          <div className='inputd'>
          <label htmlFor="amount">Amount</label>
          <input type="number" id="amount"  value={amount} onChange={handleamount}/>
        </div>
        <div className='inputd'>
          <label htmlFor="from">From currency:</label>
        <select name="from" value={fromcurrency} id="from" onChange={handlefrom}>
            <option value="USD">USD-UNITED STATES DOLLARS</option>
            <option value="EUR">EUR-EURO</option>
            <option value="GBP">GBP-BRITISH POUND STERLING</option>
            <option value="JPY">JPY-JAPANSE YEN</option>
            <option value="AUD">AUD-AUSTRALIAN DOLLAR</option>
            <option value="CAN">CAN-CANADIAN DOLLAR</option>
            <option value="CNY">CNY-CHINESE YUAN</option>
            <option value="INR">INR-INDIAN RUPPE</option>
            <option value="BRL">BRL-BRAZILAN REAL</option>
            <option value="ZAR">ZAR-SOUTH AFRICAN RAND</option>
          </select>
        </div>
        <div className='inputd'>
          <label htmlFor="">To currency:</label>
        <select name="TO" value={tocurrency} id="TO" onChange={handleto}>
            <option value="USD">USD-UNITED STATES DOLLARS</option>
            <option value="EUR">EUR-EURO</option>
            <option value="GBP">GBP-BRITISH POUND STERLING</option>
            <option value="JPY">JPY-JAPANSE YEN</option>
            <option value="AUD">AUD-AUSTRALIAN DOLLAR</option>
            <option value="CAN">CAN-CANADIAN DOLLAR</option>
            <option value="CNY">CNY-CHINESE YUAN</option>
            <option value="INR">INR-INDIAN RUPPE</option>
            <option value="BRL">BRL-BRAZILAN REAL</option>
            <option value="ZAR">ZAR-SOUTH AFRICAN RAND</option>
          </select>
          <div className='output'>
            <p>{amount} {fromcurrency} is equal to {convert} {tocurrency}</p>
          </div>
        </div>
        </div>
       
      </div>

  )
}

export default App
