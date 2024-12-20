import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '/assets/FoodAppimages/43.png';
const ForgetPass = () => {
    let navigate = useNavigate()
    let {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()


    const onSubmit = async (data) => {
        try {
            let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request', data)
            console.log(response.data.message)
            toast.success(response.data.message)
            navigate('/reset-pass')
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
                             <h3 className='h5'>Forgot Your Password?</h3>
                             <span className=' text-muted'>No worries! Please enter your email and we will send a password reset link </span>
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
                            
                           
                             <button className="btn btn-success w-100 my-2">Submit</button>
                         </form>
                     </div>
                 </div>
             </div>

         </div>
     </div>
     </>
    );
}

export default ForgetPass;
