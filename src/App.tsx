import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import Tasks from './components/tasks';
import Input from './components/input';
import { taskInterface } from './types';

function App() {
  const [refrsh, setRefresh] = useState<number>(0)
  const [items, setItems] = useState<taskInterface[]>([])
  useEffect(() =>{
    setItems([])
    const a:taskInterface[] = []
    for(let i = 0; i < (localStorage.length); i++){
      const newItemJason2: any = localStorage.getItem(`item${i}`)
      const itemNew = JSON.parse(newItemJason2)
      itemNew.id && a.push(itemNew)
  }
  setItems(a)
  }, [refrsh])
  function clear(){
    localStorage.clear()
    setRefresh(Math.random())
  }
  return (
    <div className='app'>
      <Input re={() => setRefresh(Math.random())}/>
      {items.map((task)=>{
        return(
          <Tasks key={task.id} it={task}/>
        )
      })}
      <button onClick={clear}>clear</button>
    </div>
  );
}

export default App;
