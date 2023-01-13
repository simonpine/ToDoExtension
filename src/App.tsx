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
  const [mode, setMode] = useState<string>('dark')
  const [TaskColor, setTaskColor] = useState<string>('lightTask')
  const [total, setTotal] = useState<number>(0)
  const [modeAppcont, setModeAppcont] = useState<string>('dark')
  const [modeApp, setModeApp] = useState<string>('dark')
  const [succes, setSuccess] = useState<number>(0)
  const [pending, setPending] = useState<number>(0)
  const [refrsh, setRefresh] = useState<number>(0)
  const [refrsh2, setRefresh2] = useState<number>(0)
  const [items, setItems] = useState<taskInterface[]>([])
  const [items2, setItems2] = useState<taskInterface[]>([])
  useEffect(() => {
    const a: taskInterface[] = []
    const b: taskInterface[] = []
    for (const property in { ...localStorage }) {
      if (property !== 'mode') {
        const newItemJason2: any = localStorage.getItem(`${property}`)
        const itemNew = JSON.parse(newItemJason2)
        if (itemNew.id) {
          // a.push(itemNew)
          if (itemNew.compleat) {
            b.push(itemNew)
          }
          else {
            a.push(itemNew)
          }
        }
      }
    }
    setSuccess(b.length)
    setPending(a.length)
    setItems(a)
    setItems2(b)
    setTotal(a.length + b.length)
  }, [refrsh])
  useEffect(() => {
    if (!localStorage.getItem('mode')) {
      localStorage.setItem('mode', mode)
    }
    const itemMode: any = localStorage.getItem(`mode`)
    setMode(itemMode)
    if (itemMode === 'dark') {
      setMode('dark')
      setTaskColor('darkTask')
      setModeAppcont('dark' + 'ContApp')
      setModeApp('dark' + 'App')
    }
    else {
      setMode('light')
      setTaskColor('lightTask')
      setModeAppcont('light' + 'ContApp')
      setModeApp('light' + 'App')
    }
  }, [])
  function clear() {
    for (const property in { ...localStorage }) {
      if (property !== 'mode') {
        localStorage.removeItem(property)
      }
    }
    setRefresh(Math.random())
  }
  function changeMode() {
    if (mode === 'light') {
      localStorage.setItem('mode', 'dark')
      setTaskColor('darkTask')
      setMode('dark')
      setModeAppcont('dark' + 'ContApp')
      setModeApp('dark' + 'App')
    }
    else {
      localStorage.setItem('mode', 'light')
      setTaskColor('lightTask')
      setMode('light')
      setModeAppcont('light' + 'ContApp')
      setModeApp('light' + 'App')
    }
    // setRefresh2(Math.random())
  }
  return (
    <div className={`appContainer ${modeAppcont}`} >
      <div className={`app ${modeApp}`}>
        <div className='clasificationContainer'>
          <h3 className='clasification T'>total: {total}</h3>
          <h3 className='clasification P'>pending: {pending}</h3>
          <h3 className='clasification S'>succes: {succes}</h3>
          <button onClick={changeMode} className='darkButton'><img className='dark' alt='modeLight/dark' src={mode === 'dark' ? light : dark} /></button>
        </div>
        <Input re={() => setRefresh(Math.random())} colorText={mode} />
        <div className='tasksContainer'>
          {items.map((task) => {
            return (
              <Tasks re={() => setRefresh(Math.random())} TaskColor={TaskColor} colorText={mode} key={task.id} it={task} />
            )
          })}
          {items2.map((task) => {
            return (
              <Tasks re={() => setRefresh(Math.random())} TaskColor={TaskColor} colorText={mode} key={task.id} it={task} />
            )
          })}
        </div>
        <button className='clear' onClick={clear}>clear all <img src={trash} alt='trash' /></button>
      </div>
    </div>
  );
}

export default App;
