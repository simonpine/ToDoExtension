import { taskInterface } from '../types';
export default function Tasks({it}:any) {
    const item: taskInterface = it
    return (
      <div >
        <h1>{it.task}</h1>
      </div>
    );
  }
  