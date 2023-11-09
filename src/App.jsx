import { useState,useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setlength] = useState(8);
  const [takeNumber, setNumber] = useState(false);
  const [takeCharacters, settakeCharacters] = useState(false);
  const [password, setPassword] = useState("");
  const copyPassRef = useRef(null);


  const copyToClipboard = ()=>{
    copyPassRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }
  const generatePassword = useCallback(()=>{
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (takeNumber){
      str += '1234567890';
    }
    if (takeCharacters){
      str+='~!@#$%^&*()_+=[]{}/.><,:;';
    }
    for(let i = 0;i<length;i++){
      let idx = Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(idx);
    }
    setPassword(pass);
  },[length,takeNumber,takeCharacters,setPassword]);

  useEffect(()=>{
    generatePassword()
  },[length,takeNumber,takeCharacters,generatePassword])
  

  return (
    <>

      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8  bg-gray-700 p-5' >
        <h1 className=' text-center mb-5 text-4xl'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4 text-black'>
          <input 
            type='text'
            value ={password}
            className='outline-none w-full py-1 px-3  bg-white rounded-lg h-10 text-lg '
            placeholder='password'
            readOnly
            ref={copyPassRef}
          />
          <button onClick={copyToClipboard}
          className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0 ml-2 rounded-lg
          hover:bg-sky-700'
          >Copy</button>
        </div>
          <div
          className='flex text-sm gap-x-2'
           >
            <div className='flex items-center fap-x-1 mr-2'>
              <input 
              type='range'
              min = {6}
              max = {30}
              value={length}
              className='cursor-pointer mr-2'
              onChange={(e)=>{setlength(e.target.value)}}
              />
              <label>Length : {length}</label>
            </div>
            <div className='flex items-center gap-x-1 mt-0.5 '>
            <input 
              type='checkbox'
              defaultChecked = {takeNumber}
              id = "numberInput"
              className='cursor-pointer'
              onChange={()=>{
                setNumber((prev)=>!prev);
              }}
              />
              <label htmlFor='numberInput'
              className='mr-4'
              >Numbers</label>
              <input 
              type='checkbox'
              defaultChecked = {takeNumber}
              id = "characterInput"
              className='cursor-pointer'
              onChange={()=>{
                settakeCharacters((prev)=>!prev);
                // what u did here is 
                // since onChange expexts a reference of functions 
                // we could have given dirctly ()=>settakeCharacters() 
                // but we didnt updated our variable so we do usually as variable + 1 
                // hrere we has to provide boolean opposite of it so we return a opposite boolean 
                          // this shit for reference      update our variable which gets returns in stc'sparameter  
                // so we did {()=>settakeCharacters(        (prev)=>!prev           )}
                // we can also use ternary operator
                // onClick={() => settakeCharacters(prev => prev ? false : true)} here it is or
                // onClick={() => settakeCharacters(prev ? false : true)}
              }}
              />
              <label htmlFor='characterInput'>Characters</label>
            </div>
           </div>
      </div>  

    </>
  )
}

export default App
