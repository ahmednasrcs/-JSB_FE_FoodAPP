import React from 'react';
import logo from '../../../../../FoodAppimages/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    let navigate = useNavigate()
    let {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()


    const onSubmit = async (data) => {
        try {
            let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Login', data)
            console.log(response)
            toast.success('welcom')
            navigate('/dashboard')
        } catch (error) {
            toast.error(error.response.data.message)

        }
    };

    return (
        <>
           <div className=' auth-containner  '>
            
            <div className=' container-fluid bg-overlay'>
                <div className='row vh-100 justify-content-center align-items-center'>
                    <div className="col-md-6 col-lg-4 bg-white rounded rounded-2 px-5 py-3   ">
                        <div>
                            <div className='logo-container text-center'>
                                <img className='w-75' src={logo} alt='logo' />
                            </div>
                            <div className="title my-3">
                                <h3 className='h5'>Login</h3>
                                <span className=' text-muted'>Welcome Back! please enter your details</span>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">
                                        <i className='fa  fa-envelope ' aria-hidden="true"></i>
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter your Email"
                                        aria-label="email"
                                        aria-describedby="basic-addon1"
                                        {...register('email', {
                                            required: 'email is required',
                                        })}
                                    />
                                </div>
                                {errors.email && <span className='text-danger mb-2'>{errors.email.message}</span>}
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">
                                        <i className='fa  fa-key ' aria-hidden="true"></i>
                                    </span>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter your Password"
                                        aria-label="password"
                                        aria-describedby="basic-addon1"
                                        autoComplete="current-password"
                                        {...register('password', {
                                            required: 'password is required',
                                            pattern: {
                                                value: '',
                                                message: 'Email is not valid'
                                            }
                                        })}
                                    />
                                </div>
                                {errors.password && <span className='text-danger mb-2'>{errors.password.message}</span>}
                                <div className="links d-flex justify-content-between">
                                    <Link to='/register' className=' text-muted  fw-bold text-decoration-none'>Register Now?</Link>
                                    <Link to='/forget-Pass' className=' text-success text-decoration-none' >Forgot Passord?</Link>
                                </div>
                                <button className="btn btn-success w-100 my-2">Login</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </>
     
    );
}

export default Login;