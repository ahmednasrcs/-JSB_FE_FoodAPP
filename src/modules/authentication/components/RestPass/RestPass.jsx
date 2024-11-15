import React from 'react';
import logo from '/assets/FoodAppimages/43.png';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const RestPass = () => {

    let navigate = useNavigate()
    let {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()


    const onSubmit = async (data) => {
        try {
            let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset', data)
            console.log(response.data.message)
            toast.success(response.data.message)
            navigate('/login')
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
                                <h3 className='h5'> Reset  Password </h3>
                                <span className=' text-muted'>Please Enter Your Otp  or Check Your Inbox</span>
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
                                        <i className='fa  fa-lock ' aria-hidden="true"></i>
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="OTP"
                                        aria-label="OTP"
                                        aria-describedby="basic-addon1"
                                        autoComplete="current-password"
                                        {...register('seed', {
                                            required: 'seed is required',
                                            pattern: {
                                                value: '',
                                                message: 'seed is not valid'
                                            }
                                        })}
                                    />
                                       
                                </div>
                                {errors.seed && <span className='text-danger mb-2'>{errors.seed.message}</span>}

                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">
                                        <i className='fa  fa-lock ' aria-hidden="true"></i>
                                    </span>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder=" New Password"
                                        aria-label="password"
                                        aria-describedby="basic-addon1"
                                        autoComplete="current-password"
                                        {...register('password', {
                                            required: 'password is required',
                                            pattern: {
                                                value: '',
                                                message: 'password is not valid'
                                            }
                                        })}
                                    />
                                       
                                </div>
                                {errors.Password && <span className='text-danger mb-2'>{errors.Password.message}</span>}

                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">
                                        <i className='fa fa-lock ' aria-hidden="true"></i>
                                    </span>
                                <input
                                        type="password"
                                        className="form-control"
                                        placeholder=" Confirm New Password"
                                        aria-label="password"
                                        aria-describedby="basic-addon1"
                                        autoComplete="current-password"
                                        {...register('confirmPassword', {
                                            required: 'password is required',
                                            pattern: {
                                                value: '',
                                                message: 'Confirm New Password is not valid'
                                            }
                                        })}
                                    />
                                    </div>
                                {errors.confirmPassword && <span className='text-danger mb-2'>{errors.confirmPassword.message}</span>}
                                
                                <button className="btn btn-success w-100 my-2">Reset Password</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </>
    );
}

export default RestPass;
