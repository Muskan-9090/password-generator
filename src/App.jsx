import { useState ,useCallback, useEffect,useRef} from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const [password,setPassword] = useState("")
  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(()=>{
    let pass=""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed){
      str += "0123456789"
    }
    if(charAllowed){
      str += "!@#$%&*(){}[]?/><~"
    }
    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random() * str.length +1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  },[length,numberAllowed,charAllowed])
  const CopyPasswordToClipboard  = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])
  return (
    <>
      
      <div 
      className = "w-full max-w-lg mx-auto shadow-md rounded-lg px-10 my-60 py-6 text-orange-500 bg-white">
        <h1 
        className = "text-3xl text-center text-black h-20">Password Generator</h1>
        <div 
        className="flex shadow-md rounded-lg overflow-hidden mb-4">
          <input 
          type="text" value={password} className="w-full px-5 py-1 outline-none bg-blue-100 text-black" placeholder='Password' readOnly ref = {passwordRef}></input>
          <button className='bg-blue-500 text-white px-2 py-1 hover:bg-green-500'
          onClick ={CopyPasswordToClipboard} >Copy</button>
        </div>
        <div 
        className='flex gap-x-2 text-sm'>
          <div 
          className='flex items-center gap-x-1'>
            <label 
            className=" text-black text-xl mg-x-2">Length({length})</label>
            <input 
            type="range" min = {5} max={15} value={length} className='cursor-pointer'
            onChange = {(e)=>{setLength(e.target.value)}}></input>
          </div>
          <div 
          className='flex items-center gap-x-1'>
            <input 
            type='checkbox' id='num' defaultChecked={numberAllowed} className='px-2 py-2' onChange = {()=>{
              setNumberAllowed((prev)=> !prev);
            }}></input>
            <label 
            htmlFor='num' className=" text-black text-xl mg-x-4 px-1 ">Number</label>
            <input 
            type='checkbox' id='char' defaultChecked={charAllowed} className='px-2 py-2'
            onChange = {()=>{
              setCharAllowed((prev)=> !prev);
            }}></input>
            <label 
            htmlFor='char' className=" text-black text-xl mg-x-4 px-1">Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
