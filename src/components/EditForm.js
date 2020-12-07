import React,{useContext,useEffect} from 'react'
import instance from '../config/axiosConfig'
import ReactModal from 'react-modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {dataContext} from '../context/data'


export default function EditForm(props) {
    const { setData, setRegisterData} = useContext(dataContext)
    const formik = useFormik({
        initialValues: {
            temperature: props.previousTemperature,

        },
        validationSchema: Yup.object({
            temperature: Yup.number().required('Required!'),
        }),
        onSubmit: (event, onSubmitProps) => {
            handleEditTemperature(event);
            props.closeModal()
            onSubmitProps.resetForm()
        }
    });
    
    const payload = {
        temperature: formik.values.temperature,
    }

    const handleEditTemperature = () => {
        console.log(props.visitor_id)
        instance.patch(`checkin/repeat_visitor/${props.visitor_id}/`, payload).then(responseOne => {
            instance.get('checkin/register/').then(response=>{
                setData(response.data)
            }).catch((error)=>{
                console.log(error)
            })
            instance.get('checkin/add_visitor/').then(response=>{
                setRegisterData(response.data)
            })
        }).catch(error => {
            console.log(error)
        })
    }
    useEffect(() => {
		ReactModal.setAppElement('body')
	})

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
                    width: '400px',
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
            <div className="signinContainer">
                <Form className="signinForm" onSubmit={formik.handleSubmit}>
                    <Form.Group >
                        <Form.Label>Temperature</Form.Label>
                        <Form.Control type="number" step="0.01" onChange={formik.handleChange}
                            name="temperature"
                            value={formik.values.temperature} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                </Button>
                </Form>
            </div>
        </ReactModal>

    )
}