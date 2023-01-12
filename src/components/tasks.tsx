import { useEffect } from 'react';
import { taskInterface } from '../types';
import trash from '../img/trash.png'
export default function Tasks({it, re}:any) {
    const item: taskInterface = it
    function deleteItem(){
      localStorage.removeItem(`item${item.id}`)
      re()
    }
    function changeCheck(evt: React.ChangeEvent<HTMLInputElement>){
      const newItemJason2: any = localStorage.getItem(`item${item.id}`)
      const itemNew = JSON.parse(newItemJason2)
      itemNew.compleat = evt.target.checked
      localStorage.setItem(`item${item.id}`, JSON.stringify(itemNew))
      re()
    }
    useEffect(()=>{

    },[])
    return (
      <div className={`task ${item.compleat && 'compleat'}`}>
        <h4 className='taskText'>{it.task}</h4>

        <button className='delete' onClick={deleteItem} ><img src={trash} alt='trash' /></button>
        <input checked={item.compleat} onChange={changeCheck} type='checkbox'/>
        <div>

        </div>
      </div>
    );
  }
  