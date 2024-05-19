import React from 'react';
// import { useSelector } from 'react-redux';
import RTE from './RTE';
import { useForm } from 'react-hook-form';


function TaskCard({task}) {
  const { control } = useForm();
  
  console.log(task,"from card")
  return (
<>
<div className='h-80 w-80 border-2 border-black  ml-8 mt-8 mr-8'>
      < RTE control={control}  defaultValue={task.notes} label="notes" toolbar={false} height={50}/>
    <div>
    </div>
    <p className='mt-1 ml-1'>Estimates</p>
      <div className='h-24 flex flex-col overflow-scroll'>
       {task.estimates.map((ele)=>{
          return(
          <div key={ele._id}>
        <p>estimated time</p>
       <p>{ele.estimatedTime}</p>
      <RTE control={control}  defaultValue={ele.estimateNotes} label="Estimat notes" toolbar={false} height={50} disable={true}/>
       </div>
          )
       })}
      </div>
      <button  className='mt-2 ml-2 border border-black rounded-md p-1 bg-blue-400'>completed</button>
      <button  className='mt-2 ml-2 border border-black rounded-md p-1 bg-blue-400'>Edit</button>
    </div>
    
</>
  )
}

export default TaskCard
