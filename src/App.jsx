import {useState, useCallback, useEffect, useRef} from 'react'
import './App.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [length, setLength] =  useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // ref hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(
    () => {
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmopqrstuvwxyz"

      if(numberAllowed) str+="0123456789"
      if(charAllowed) str+="!@#$%^&*(){}~_-=*/+"

      for(let i=1;i<=length;i++){
        let char = Math.floor(Math.random() * str.length + 1)
        pass+= str.charAt(char);
      }

      setPassword(pass)
    },
    [length, numberAllowed, charAllowed, setPassword],
  )

  const copyPassWordToClipBoard = useCallback(()=>{
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 3)
    window.navigator.clipboard
    .writeText(password)
    .then(()=>{
      toast.success("Password Copied to Clipboard! ", { autoClose: 3000 });
    })
    .catch(() => {
      toast.error("Failed to Copy Password 😞", { autoClose: 2000 });
    });
  },[password])

  useEffect(() =>{
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
   <>
   <ToastContainer />
   <div className='background-container'>
    <div className='content-container'>

    <h1 className='text-white text-center my-5 text-4xl '>Password Generator</h1>
    <h2 className='text-white text-center text-3xl'>Strong. Unique. Yours—create your password today!</h2>
   
    <div className="w-full max-w-xl mx-auto shadow-lg rounded-lg px-4 py-3 my-20 bg-gray-800 text-purple-500 text-lg ">
      <h1 className='text-white text-xl text-center my-3'>Create Your Password !</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-6">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
        />
        <button
        onClick={copyPassWordToClipBoard}
         className='flex outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 leading-loose'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-4'>
        <div className='flex items-center gap-x-2'>
          <input 
          type='range'
          min={6}
          max={30}
          value={length}
          className='cursor-pointer'
          onChange={(e) => setLength(e.target.value)}
           />
           <label className='text-lg'>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
          type='checkbox'
          defaultChecked={numberAllowed}
          id='numberInput'
          onChange={()=>{
            setnumberAllowed((prev)=> !prev);
          }}
          />
          <label htmlFor='numberInput' className='text-white text-lg'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
          type='checkbox'
          defaultChecked={charAllowed}
          id='charInput'
          onChange={()=>{
            setCharAllowed((prev)=> !prev);
          }}
          />
          <label htmlFor='charInput' className='my-2 text-white text-lg'>Characters</label>
        </div>
      </div>
    </div>

    </div>
    </div>
    
   </>
  )
}

export default App
