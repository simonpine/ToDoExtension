import { useEffect, useState, useRef } from 'react';
import { taskInterface } from '../types';
import trash from '../img/trash.png'
import x from '../img/x.png'
import editLight from '../img/editDark.png'
export default function Tasks({ it, re, colorText, TaskColor }: any) {
  const [color, setColor] = useState('')
  const [edit, setEdit] = useState(false)
  const [out, setOut] = useState('')
  const [out2, setOut2] = useState('')
  const [edit2, setEdit2] = useState(false)
  const refInput: any = useRef<HTMLInputElement>(null)
  const refArea: any = useRef<HTMLInputElement>(null)
  const [reEfec, setreEfec] = useState(0)
  const [prioritty, setPriority] = useState('')
  const [none2, setNone2] = useState('none')
  const item: taskInterface = it
  function deleteItem() {
    localStorage.removeItem(`item${item.id}`)
    re()
  }
  function changePrio() {
    if (item.priority === 0) {
      const newItemJason2: any = localStorage.getItem(`item${item.id}`)
      const itemNew: taskInterface = JSON.parse(newItemJason2)
      itemNew.priority = 1
      localStorage.setItem(`item${item.id}`, JSON.stringify(itemNew))
      item.priority = 1
    }
    else if (item.priority === 1) {
      const newItemJason2: any = localStorage.getItem(`item${item.id}`)
      const itemNew: taskInterface = JSON.parse(newItemJason2)
      itemNew.priority = 2
      localStorage.setItem(`item${item.id}`, JSON.stringify(itemNew))
      item.priority = 2
    }
    else if (item.priority === 2) {
      const newItemJason2: any = localStorage.getItem(`item${item.id}`)
      const itemNew: taskInterface = JSON.parse(newItemJason2)
      itemNew.priority = 3
      localStorage.setItem(`item${item.id}`, JSON.stringify(itemNew))
      item.priority = 3
    }
    else {
      const newItemJason2: any = localStorage.getItem(`item${item.id}`)
      const itemNew: taskInterface = JSON.parse(newItemJason2)
      itemNew.priority = 0
      localStorage.setItem(`item${item.id}`, JSON.stringify(itemNew))
      item.priority = 0
    }
    setreEfec(Math.random())
  }
  function changeCheck(evt: React.ChangeEvent<HTMLInputElement>) {
    const newItemJason2: any = localStorage.getItem(`item${item.id}`)
    const itemNew: taskInterface = JSON.parse(newItemJason2)
    itemNew.compleat = evt.target.checked
    localStorage.setItem(`item${item.id}`, JSON.stringify(itemNew))
    re()
  }
  function task() {
    if (none2 === 'none') {
      setNone2('')
    }
    else {
      setOut('out')
      setOut2('out2')
      
      setTimeout(() => {
        setNone2('none')
        setOut('')
        setOut2('')
      }, 400);
    }
    setEdit(false)
    setEdit2(false)
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
  function changeTask() {
    if(refInput.current !== null || refArea.current !== null){
      const newItemJason2: any = localStorage.getItem(`item${item.id}`)
      const itemNew: taskInterface = JSON.parse(newItemJason2)
      if(refInput.current !== null){
        itemNew.task = refInput.current.value
        item.task = refInput.current.value
      }
      if(refArea.current !== null){
        itemNew.description = refArea.current.value
        item.description = refArea.current.value
      }
      localStorage.setItem(`item${item.id}`, JSON.stringify(itemNew))
    }
    task()
    refInput.current = null;
    refArea.current = null;
  }
  return (
    <div className={`task ${colorText} ${item.compleat && 'compleat'} ${TaskColor}`}>
      <button onClick={task} className={'ChangeTask ' + colorText}>
        <h4 className='taskText'>{it.task}</h4>
      </button>
      <button onClick={changePrio} className={`prio ${color} ${colorText}`}>{prioritty} priority</button>
      <div className='content2'>
        <h5 className='date'>{item.dateCreation}</h5>
        <input className='checkbox' checked={item.compleat} onChange={changeCheck} type='checkbox' />
        <button className='delete' onClick={deleteItem} ><img src={trash} alt='trash' /></button>
      </div>
      <div className={`${TaskColor} ${out} inerTSettings ${none2}`}>
        <div className='initial'>
          <h3>Task settings</h3>
          <img onClick={task} alt='x' className='x' src={x} />
        </div>
        <div className='secundal'>
            {!edit ?
              <div className='editFalse'>
                <h3 className='itemTaskE'>{item.task}</h3>
                <button className='delete' onClick={() => setEdit(true)} ><img src={editLight} alt='edit' /></button>
              </div>
              :
              <div>
                <input placeholder={item.task} className={'inputMain2 ' + colorText} type='text' ref={refInput} required />
              </div>
            }
            <div className='sepa'>
              {item.description ?
                <div>
                  {!edit2 ?
                    <div className='editFalse'>
                      <p>
                        {item.description}
                      </p>
                      <button onClick={() => setEdit2(true)} className='addDes'>Edit description</button>
                    </div>
                    :
                    <div>
                      <textarea ref={refArea} className={colorText} placeholder={item.description}></textarea>
                    </div>
                  }
                </div>
                :
                <div>
                  {!edit2 ?
                    <div className='editFalse'>
                      <button onClick={() => setEdit2(true)} className='addDes'>Add description</button>
                    </div>
                    :
                    <div>
                      <textarea ref={refArea} className={colorText} placeholder={item.description}></textarea>
                    </div>
                  }
                </div>
              }
            </div>
            <div className='buttonCont'>
              <button className={'buttonEnd red ' + colorText} onClick={task} >Close</button>
              <button className={'buttonEnd blue ' + colorText} onClick={changeTask} type='submit'>Save Changes</button>
            </div>
        </div>
      </div>
      <div onClick={task} className={`setags ${none2} ${out2}`}>
      </div>

    </div>
  );
}
