import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import RTE from "./RTE"

function Edit() {
    const location = useLocation();
    const records = useSelector(state =>state.records.records)
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('taskId');
    const task = records.find(record=>record._id==taskId);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { control, handleSubmit, register, formState: { errors } }= useForm({
      defaultValues: {
        taskNumber: task?.taskNumber || '',
        notes: task?.notes || '',
      }
    })
    const [error, setError] = useState();

    const onSubmit = async (data) => {
      console.log(data);

    };

    return (
      <div className='w-full h-full flex justify-center items-center mt-8'>
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/2">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <label htmlFor="taskNumber">Task Number</label>
        <input
          id="taskNumber"
          type="text" // Use type="text" for visible text input
          {...register('taskNumber')}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
       disabled={true} />
        
        <RTE name="notes" control={control} label="Notes" defaultValue={task?.notes} height={400} />
        <h3>Estimates</h3>
        <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded-md">Add new Estimates</button>
        <div className='h- flex flex-col overflow-scroll mt-4 border border-black'>
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
        <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded-md">Update</button>
      </form>
    </div>
    );
}

export default Edit
