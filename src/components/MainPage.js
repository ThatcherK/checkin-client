import React, { useState } from 'react'
import DatatablePage from './DataTable'
import VisitorForm from './VisitorForm';

export default function MainPage() {
   const [isOpen, setIsOpen] = useState(false)
   const handleModalOpen = ()=>{
       setIsOpen(true)
   }
   const handleModalClose = ()=>{
       setIsOpen(false)
   }
    return (
        <div className="tableContainer">
            <button onClick={handleModalOpen} className="addVisitorButton">Add new visitor</button>
            <DatatablePage/>
            <VisitorForm isOpen={isOpen} closeModal={handleModalClose}/>
        </div>
    )
}