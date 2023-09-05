import React, { useState } from 'react'
import AddNote from './AddNote';
import AllNotes from './AllNotes';

const Notes = () => {



  return (
    <div className='w-full pt-24'>
        <AddNote />
        <AllNotes />
    </div>
  )
}

export default Notes