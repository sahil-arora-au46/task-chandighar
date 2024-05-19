import React, { useState } from 'react';
import RTE from './RTE';
import { useForm } from 'react-hook-form';
import {addRecord} from "../store/taskSlice"
import { useDispatch } from 'react-redux';


function TaskForm() {
  const { control, handleSubmit, register, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const dispatch = useDispatch()

  const onSubmit = async data => {
    console.log(data)
    const record = {
        notes: data.notes,
        taskNumber : data.taskNumber,
        estimates:{
            estimatedTime:data.estimatedTime,
            estimateNotes:data.estimateNotes || ""
        }
    }
    setError("")
    try {
      const response = await fetch('http://localhost:4909/records/addTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(record)
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Error logging in');
      }

      console.log(responseData,"hkhefjhkashdjhfsgakjh");
    //   dispatch(addRecord({responseData}))
      
      // Save token to local storage or state for future requests
      

    } catch (err) {
      console.log('Error logging in:', err);
      setError(err.message); // Set the error message to display it in the UI
    }
  };

  return (
    <div className='w-full h-full flex justify-center items-center mt-8'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="taskNumber">Task Number</label>
        <input
          id="taskNumber"
          type="text" // Use type="text" for visible text input
          {...register('taskNumber', {
            required: 'Task Number is required',
            pattern: {
              value: /^[A-Z][0-9]+$/,
              message: 'Task number must start with a capital letter followed by numbers',
            },
          })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.taskNumber && <p className="text-red-500">{errors.taskNumber.message}</p>}
        
        <RTE name="notes" control={control} label="Notes" defaultValue="Initial content"  height={400}/>
        <label htmlFor="estimatedTime">Estimated Time</label>
        <input
          id="estimatedTime"
          type="text" // Use type="text" for visible text input
          {...register('estimatedTime', {
            required: 'Estimated Time Number is required',
            pattern: {
                value: /^(?!0)\d{1,2}(\.[0-5][0-9])?$/,
                message: 'Estimated Time must be a number with up to two decimal places (0 to 59 )',
              },
            
          })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.estimatedTime && <p className="text-red-500">{errors.estimatedTime.message}</p>}
        <RTE name="estimateNotes" control={control} label="Estimate Notes" defaultValue="Initial content"  />
        <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded-md">Submit</button>
      </form>
    </div>
  );
}

export default TaskForm;
