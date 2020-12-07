import React from 'react'
import Navigationbar from '../Navigationbar'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import instance from '../../config/axiosConfig'


export default function SignIn() {
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Required!'),
            password: Yup.string().min(8, 'Minimum 8 characters').required('Required!')
        }),
        onSubmit: (event, onSubmitProps) => {
            handleLogIn(event);
            onSubmitProps.resetForm()
        }
    });
    const payload = {
        username: formik.values.username,
        password: formik.values.password
    }
    const handleLogIn = () => {
        instance.post('auth/login/',payload).then(response=>{
            console.log(response)
        })
    }
    return (
        <div className="signinContainer">

            <Navigationbar />
            <Form className="signinForm" onSubmit={formik.handleSubmit}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" onChange={formik.handleChange}
                        name="username"
                        value={formik.values.username} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={formik.handleChange}
						name="password"
						value={formik.values.password} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
            </Button>
            </Form>
        </div>
    )
}