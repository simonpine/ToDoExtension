import { taskInterface } from '../types';
import { useRef } from "react";
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export default function Input({re}:any) {
    const refInput: any = useRef<HTMLInputElement>(null)
    function hundleSubmit(evt: React.FormEvent<HTMLFormElement>){
        evt.preventDefault()
        const date = new Date();
        const id = Math.floor(Math.random() * 1000);
        const dateSub = `${months[date.getMonth()]} ${date.getDate()}`
        const newTask:taskInterface = {
            task: refInput.current.value,
            compleat: false,
            priority: 0,
            dateCreation: dateSub,
            id: id,
        }
        localStorage.setItem(`item${id}`, JSON.stringify(newTask))
        refInput.current.value = '';
        re()
    }
    return (
      <form onSubmit={hundleSubmit}>
        <input required type='text' ref={refInput}/>
        <button type='submit'>submit</button>
      </form>
    );
  }
  