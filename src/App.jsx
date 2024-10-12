import React, { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App(){
  const [input, setInput]=useState(6)
  const [isNum, setIsNum]=useState(false)
  const [isSpicalChar, setIsSpecialChar]=useState(false)
  const [password, setPassword]=useState("")

 const passwordRef = useRef(null)

  const genratePass = useCallback(()=>{
    let pass =""
    let string= "ABCDEFGHIJKLMNOPQRSTUVWXYTabcdefghijklmnopqrstuvwxyz"
    // let num="1234567890"
    // let spical= "!@#$%&*"

    if(isNum){
      string+="1234567890"
    }

    if(isSpicalChar){
      string+="!@#$%&*"
    }
    for(let i=1;i<=input;i++){
      let char=Math.floor(Math.random()*string.length+1)
      pass+=string.charAt(char)
    }
    setPassword(pass)
  },[input, isNum, isSpicalChar])

  const copyPassword= useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>{
    genratePass()
  },[input,isNum,isSpicalChar,genratePass])
  return (
    <div id='main'>
      <h2>Password Generator</h2>
      <div id='input'>
      <input type='text' placeholder='password' value={password} readOnly ref={passwordRef}/>
      <button onClick={copyPassword}>Copy</button>
      </div>

      <div id='select'>
        <input type='range' min={6} max={22} value={input} onChange={(e)=>setInput(e.target.value)}/>  Length:{input} 
        <label> 
        <input type='checkbox' onChange={()=>{setIsNum((prev)=>!prev)}}/>Include Num
        </label>

        <label>
        <input type='checkbox' onChange={()=>{setIsSpecialChar((prev)=>!prev)}}/>Include Special Characters</label>
      </div>
    </div>
  )
}

export default App;