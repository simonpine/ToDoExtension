import { taskInterface } from '../types';
import { useState } from "react";
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export default function Input({re}:any) {
    const [inputVal, setInputVal] = useState('')
    function hundleSubmit(evt: React.FormEvent<HTMLFormElement>){
        evt.preventDefault()
        const date = new Date();
        const dateSub = `${months[date.getMonth()]} ${date.getDate()}`
        const newTask:taskInterface = {
            task: inputVal,
            compleat: false,
            priority: 0,
            dateCreation: dateSub,
            id: Math.floor(Math.random() * 1000),
        }
        localStorage.setItem(`item${localStorage.length}`, JSON.stringify(newTask))
        setInputVal('')
        re()
    }
    return (
      <form onSubmit={hundleSubmit}>
        <input value={inputVal} required type='text' onChange={evt => setInputVal(evt.target.value)}/>
        <button type='submit'>submit</button>
      </form>
    );
  }
  