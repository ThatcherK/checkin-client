import React,{useEffect, useState, useContext} from 'react';
import { MDBDataTable } from 'mdbreact';
import instance from '../config/axiosConfig'
import EditForm from './EditForm';
import {dataContext} from '../context/data'

const DatatablePage = () => {
    const [openModal, setOpenModal] = useState(false)
    const [visitorID,setVisitorID] = useState(null)
    const [previousTemperature, setPreviousTemperature] = useState(null)
    const {data, setData, registerData, setRegisterData} = useContext(dataContext)
    useEffect(()=>{
        instance.get('checkin/register/').then(response=>{
            setData(response.data)
        }).catch((error)=>{
            console.log(error)
        })
        instance.get('checkin/add_visitor/').then(response=>{
            setRegisterData(response.data)
        })
    },[setData])
    const handleModal = (visitor_id,temperature)=>{
      setOpenModal(true)
      setVisitorID(visitor_id)
      setPreviousTemperature(temperature)
    }
    const handleCloseModal =()=>{
      setOpenModal(false)
    }
    const rows = data.map((visitor)=>{
        const recorded_visitor = registerData.filter(person => person.id === visitor.visitor)
        let fetched_visitor = recorded_visitor[0]
        const editButton = <button className="editButton" onClick={()=>handleModal(visitor.visitor,visitor.temperature)}><i className="fas fa-edit"></i></button>
        if (fetched_visitor){
          return {
            date: visitor.date,
            name: fetched_visitor.name,
            company: fetched_visitor.company,
            identification_number:fetched_visitor.identification_number,
            telephone_number: fetched_visitor.telephone_number,
            temperature:visitor.temperature,
            edit:editButton
        }
        }
        
    })
  const tableData = {
    columns: [
      {
        label: 'Date',
        field: 'date',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Company',
        field: 'company',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Identification No',
        field: 'identification_number',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Telephone Number',
        field: 'telephone_number',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Temperature',
        field: 'temperature',
        sort: 'asc',
        width:  150
      },
      {
        label: 'Edit',
        field: 'edit',
        width:  150
      }
    ],
    rows: rows
  };

  return (
    <div>
      <MDBDataTable
      striped
      bordered
      small
      data={tableData}
    />
    <EditForm visitor_id={visitorID} previousTemperature={previousTemperature} isOpen={openModal} closeModal={handleCloseModal}/>
    </div>
    
  );
}

export default DatatablePage;