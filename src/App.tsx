import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import Tasks from './components/tasks';
import Input from './components/input';
import { taskInterface } from './types';
import dark from './img/darkMode.png'
import trash from './img/trash2.png'
import light from './img/lightMode.png'

function App() {
  const [mode, setMode] = useState<string>('light')
  const [total, setTotal] = useState<number>(0)
  const [succes, setSuccess] = useState<number>(0)
  const [pending, setPending] = useState<number>(0)
  const [refrsh, setRefresh] = useState<number>(0)
  const [items, setItems] = useState<taskInterface[]>([])
  useEffect(() => {
    let p = 0
    let s = 0
    const a: taskInterface[] = []
    for (const property in { ...localStorage }) {
      if(property !== 'mode'){
        const newItemJason2: any = localStorage.getItem(`${property}`)
        const itemNew = JSON.parse(newItemJason2)
        if (itemNew.id) {
          a.push(itemNew)
          itemNew.compleat ? s = s + 1 : p = p + 1
        }
      }
    }
    setSuccess(s)
    setPending(p)
    setItems(a)
    setTotal(a.length)
  }, [refrsh])
  useEffect(() => {
    if(!localStorage.getItem('mode')){
      localStorage.setItem('mode', mode)
    }
    // if(mode === 'light'){

    // }
  }, [])
  function clear() {
    for (const property in { ...localStorage }) {
      if(property !== 'mode'){
        localStorage.removeItem(property)
      }
    }
    setRefresh(Math.random())
  }
  return (
    <div className='app'>
      <div className='clasificationContainer'>
        <h3 className='clasification T'>total: {total}</h3>
        <h3 className='clasification P'>pending: {pending}</h3>
        <h3 className='clasification S'>succes: {succes}</h3>
        <button className='darkButton'><img className='dark' alt='modeLight/dark' src={dark} /></button>
      </div>
      <Input re={() => setRefresh(Math.random())} />
      <div className='tasksContainer'>
        {items.map((task) => {
          return (
            <Tasks re={() => setRefresh(Math.random())} key={task.id} it={task} />
          )
        })}
      </div>
      <button className='clear' onClick={clear}>clear all <img src={trash} alt='trash' /></button>
    </div>
  );
}

export default App;
