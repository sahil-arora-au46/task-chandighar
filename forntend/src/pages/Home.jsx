import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {setRecords} from "../store/taskSlice";
import TaskCard from '../components/TaskCard';


function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [tasks, setTask] = useState(null);

    useEffect( () => {
        const fetchUserRecords = async () => {
            try {
                const response = await fetch('http://localhost:4909/records/allrecords', {
                    credentials: 'include'
                });
                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || 'Failed to fetch user data');
                }

                if (!result.data.records) {
                    navigate("/add-task");
                } else {
                    dispatch(setRecords(result.data.records));
                    setTask(result.data.records);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

         (async()=> await fetchUserRecords())();
    }, [dispatch, navigate]);

    return (
        <div>
            <Navbar />
           <div className='flex  flex-wrap items-start justify-between '>
           {tasks == null ? (
                <div>Loading...</div>
            ) : (
                tasks.map(task => (
                    <TaskCard key={task._id} task={task} />
                ))
            )}
           </div>
        </div>
    );
}

export default Home


