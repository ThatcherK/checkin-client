import React from 'react'
import ReactModal from 'react-modal';
import instance from '../config/axiosConfig'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


export default function VisitorForm(props){
    const formik = useFormik({
        initialValues: {
            name: '',
            company: '',
            phone_number: '',
            identification_number: '',
            temperature: '',

        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required!'),
            company: Yup.string().required('Required!'),
            phone_number:Yup.string().required('Required!'),
            identification_number:Yup.string().required('Required!'),
            temperature: Yup.number().required('Required')
        }),
        onSubmit: (event, onSubmitProps) => {
            handleAddVisitor(event);
            props.closeModal()
            onSubmitProps.resetForm()
        }
    });
    const payload = {
        name: formik.values.name,
        company: formik.values.company,
        telephone_number: formik.values.phone_number,
        identification_number: formik.values.identification_number
    }
    
    const handleAddVisitor = () => {
        console.log('i am called')
        instance.post('checkin/add_visitor/',payload).then(response=>{
            console.log(response.data)
            console.log(response.data.id)
            instance.post('checkin/register/',{visitor:response.data.id,temperature: formik.values.temperature})
            .then((response)=>{
                console.log(response.data)
            })
        }).catch(error=>{
            console.log(error)
        })
    }
    return (
        <ReactModal
            isOpen={props.isOpen}
            contentLabel="Edit temperature"
            onRequestClose={props.closeModal}
            style={{
                overlay: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)'
                },
                content: {
                    position: 'fixed',
                    background: '#c0bfc0',
                    width: '500px',
                    height: 'fit-content',
                    padding: '20px',
                    borderRadius: '6px',
                    top: '50%',
                    left: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    transform: 'translate(-50%, -50%)'
                }
            }}

        >
            <Form className="signinForm" onSubmit={formik.handleSubmit}>
                <Form.Group >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" onChange={formik.handleChange}
                        name="name"
                        value={formik.values.name} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Company</Form.Label>
                    <Form.Control type="text" placeholder="Enter Company" onChange={formik.handleChange}
                        name="company"
                        value={formik.values.company} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Identification Number</Form.Label>
                    <Form.Control type="text" placeholder="ID number" onChange={formik.handleChange}
						name="identification_number"
						value={formik.values.identification_number} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control type="text" placeholder="Phone Number" onChange={formik.handleChange}
						name="phone_number"
						value={formik.values.phone_number} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Temperature</Form.Label>
                    <Form.Control type="text" placeholder="Temperature" onChange={formik.handleChange}
						name="temperature"
						value={formik.values.temperature} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </ReactModal>
       
    )
}