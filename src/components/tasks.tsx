import { useEffect, useState } from 'react';
import { taskInterface } from '../types';
import tag from '../img/tagDark.png'
import trash from '../img/trash.png'
import x from '../img/x.png'
export default function Tasks({ it, re, colorText, TaskColor }: any) {
  const [color, setColor] = useState('')
  const [reEfec, setreEfec] = useState(0)
  const [prioritty, setPriority] = useState('')
  const [none, setNone] = useState('none')
  const item: taskInterface = it
  function deleteItem() {
    localStorage.removeItem(`item${item.id}`)
    re()
  }
  function changePrio() {
    if (item.priority === 0) {
      const newItemJason2: any = localStorage.getItem(`item${item.id}`)
      const itemNew = JSON.parse(newItemJason2)
      itemNew.priority = 1
      localStorage.setItem(`item${item.id}`, JSON.stringify(itemNew))
      item.priority = 1
    }
    else if (item.priority === 1) {
      const newItemJason2: any = localStorage.getItem(`item${item.id}`)
      const itemNew = JSON.parse(newItemJason2)
      itemNew.priority = 2
      localStorage.setItem(`item${item.id}`, JSON.stringify(itemNew))
      item.priority = 2
    }
    else if (item.priority === 2) {
      const newItemJason2: any = localStorage.getItem(`item${item.id}`)
      const itemNew = JSON.parse(newItemJason2)
      itemNew.priority = 3
      localStorage.setItem(`item${item.id}`, JSON.stringify(itemNew))
      item.priority = 3
    }
    else {
      const newItemJason2: any = localStorage.getItem(`item${item.id}`)
      const itemNew = JSON.parse(newItemJason2)
      itemNew.priority = 0
      localStorage.setItem(`item${item.id}`, JSON.stringify(itemNew))
      item.priority = 0
    }
    setreEfec(Math.random())
  }
  function changeCheck(evt: React.ChangeEvent<HTMLInputElement>) {
    const newItemJason2: any = localStorage.getItem(`item${item.id}`)
    const itemNew = JSON.parse(newItemJason2)
    itemNew.compleat = evt.target.checked
    localStorage.setItem(`item${item.id}`, JSON.stringify(itemNew))
    re()
  }
  function tags() {
    if (none === 'none') {
      setNone('')
    }
    else {
      setNone('none')
    }
  }
  useEffect(() => {
    if (item.priority === 0) {
      setColor('grey')
      setPriority('none')
    }
    else if (item.priority === 1) {
      setColor('blue')
      setPriority('low')
    }
    else if (item.priority === 2) {
      setColor('yellow')
      setPriority('medium')
    }
    else {
      setColor('red')
      setPriority('high')
    }
  }, [reEfec])
  return (
    <div className={`task ${colorText} ${item.compleat && 'compleat'} ${TaskColor}`}>
      <h4 className='taskText'>{it.task}</h4>
      <button onClick={changePrio} className={`prio ${color} ${colorText}`}>{prioritty} priority</button>
      <div className='content2'>
        <button className='tag' onClick={tags} ><img src={tag} alt='trash' /></button>
        <h5 className='date'>{item.dateCreation}</h5>
        <input className='checkbox' checked={item.compleat} onChange={changeCheck} type='checkbox' />
        <button className='delete' onClick={deleteItem} ><img src={trash} alt='trash' /></button>
      </div>
      <div className={`${TaskColor} inerTgas ${none}`}>
        <div className='initial'>
          <h3>Tags settings</h3>
          <img onClick={tags} alt='x' className='x' src={x} />
        </div>
      </div>
      <div onClick={tags} className={'setags ' + none}>
      </div>
    </div>
  );
}
