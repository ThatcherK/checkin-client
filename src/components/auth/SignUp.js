import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Navigationbar from '../Navigationbar'
import instance from '../../config/axiosConfig';

export default function SignUp(){
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Required!'),
            email: Yup.string().email('Invalid email format').required('Required!'),
            password: Yup.string().min(8, 'Minimum 8 characters').required('Required!')
        }),
        onSubmit: (event, onSubmitProps) => {
            handleSignUp(event);
            onSubmitProps.resetForm()
        }
    });
    const payload = {
        username: formik.values.username,
        password: formik.values.password,
        email: formik.values.email
    }
    const handleSignUp = () => {
        instance.post('auth/register/',payload).then(response=>{
            console.log(response)
        }).catch(error=>{
            console.log(error)
        })
    }

    return (
        <div className="signinContainer">

            <Navigationbar />
            <Form className="signinForm" onSubmit={formik.handleSubmit}>
                <Form.Group >
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" onChange={formik.handleChange}
                        name="username"
                        value={formik.values.username} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Enter Email" onChange={formik.handleChange}
                        name="email"
                        value={formik.values.email} />
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