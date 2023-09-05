
import React, { useEffect, useState } from 'react'
import { fetchNotesFromFirestore, deleteNoteFromFirestore, updateNoteInFirestore  } from '../../firebase'

const AllNotes = () => {
    const [notes, setNotes] = useState([]);


    useEffect(() => {
        const fetchNotes = async () => {
            const allNotes = await fetchNotesFromFirestore();
            console.log(allNotes);
            setNotes(allNotes);
        }
        fetchNotes();
    }, [])

    const handleDelete = async (id) => {
        try {
            await deleteNoteFromFirestore(id);
            console.log("Successfully deleted note!");
        } catch (error) {
            console.error("Error deleting note: ", error.message);
        }
    };

    const handleUpdate = async (id) => {
        try {
            await updateNoteInFirestore(id);
            console.log("Successfully updated note!");
        } catch (error) {
            console.error("Error updating note: ", error.message);
        }
    };

  return (
    <div className=''>
        <ul className='grid grid-cols-4 gap-4'>
        {(notes).map(note => (
            <li key={note.id}>
                    <div className="justify-between items-center h-1/3">
                        <h2 className="text-xl font-bold truncate">{note.title}</h2>
                        {/* <p className="text-gray-600">{note.createdAt.toDate().toLocaleDateString()}</p> */}
                        <p className="text-gray-700 mt-2 text-ellipsis overflow-hidden ">{note.text}</p>
                        {/* <textarea className='w-full h-48 text-ellipsis overflow-hidden' value={note.text}></textarea> */}
                        <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded" onClick={() => handleDelete(note.id)}>
                            Delete
                        </button>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded" onClick={() => handleUpdate(note.id)}>
                            Edit
                        </button>
                    </div>




            </li>
        )
        )}
        </ul>
    </div>
  )
}

export default AllNotes