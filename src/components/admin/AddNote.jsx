import React, { useState } from 'react'
import { addNoteToFirestore } from '../../firebase'
import { SlArrowDown } from 'react-icons/sl';

const AddNote = () => {
    const [expanded, setExpanded] = useState(false);
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addNoteToFirestore({text: text, title: title,  createdAt: new Date()});
            setText('');
            setTitle('');
        } catch (error) {
            console.error("Error adding note: ", error.message);
        }
    };


  return (
    <div className='w-full'>
        <div className="flex-col justify-center text-center items-center" onClick={() => setExpanded(!expanded)}>
            <button className="text-lg justify-center items-center font-semibold">Add Notes</button>
            <button className={`ml-2 justify-center items-center transform ${expanded ? 'rotate-180' : ''}`}>
                <SlArrowDown />
            </button>
        </div>
        {expanded && (
        <div className="w-full p-4">
          <div className="mb-4 flex">
          <input
            type="text"
            placeholder="Title"
            className="flex-grow border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Text"
            className="flex-grow border p-2 rounded"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
            <button className="ml-2 bg-blue-500 text-white p-2 rounded" onClick={handleSubmit}>
              Add note
            </button>
          </div>
        </div>
        )}
    </div>
  )
}

export default AddNote