import React, {useState} from 'react'
import axios from 'axios'

import addSvg from "../../assets/img/add.svg";


const AddTaskForm = ({list, onAddTask}) => {
    const [visibleForm, setVisibleForm] = useState(false);
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState('')

    const toggleFormVisible = () => {
        setVisibleForm(!visibleForm);
        setInputValue('');
    }

    const addTask = () => {
        const obj = {
            listId: list.id,
            text: inputValue,
            completed: false
        }
        setIsLoading(true);
        axios
            .post('http://localhost:3001/tasks/', obj)
            .then(({data}) => {
                onAddTask(list.id, data);
                toggleFormVisible();
            })
            .catch(()=>{
                alert('Error adding task')
            })
            .finally(() => {
                setIsLoading(false)
            });
    }

    return (
        <div className='tasks_form'>
            {!visibleForm ? (
                <div onClick={toggleFormVisible} className='tasks_form-new'>
                    <img src={addSvg} alt='Add icon'/>
                    <span>New task</span>
                </div>
            ) : (
                <div className='tasks_form-block'>
                    <input
                        value={inputValue}
                        className="field"
                        type="text"
                        placeholder="Task text"
                        onChange={e => setInputValue(e.target.value)}
                    />
                    <button disabled={isLoading} onClick={addTask} className="button">
                        {isLoading ? 'ADDING...' : 'ADD TASK'}
                    </button>
                    <button onClick={toggleFormVisible} className="button button--grey">CANCEL</button>
                </div>
            )}
        </div>
    );
}

export default AddTaskForm;