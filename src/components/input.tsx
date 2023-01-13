import { taskInterface } from '../types';
import { useRef } from "react";
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export default function Input({re, colorText}:any) {
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
        <input className={'inputMain ' + colorText} required type='text' ref={refInput}/>
        <button className={'submitMain'} type='submit'>submit</button>
      </form>
    );
  }
  