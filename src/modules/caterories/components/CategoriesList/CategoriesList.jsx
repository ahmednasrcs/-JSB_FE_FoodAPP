import React, { useEffect, useState } from 'react';
import Header from '../../../shared/components/Header/Header';
import axios, { Axios } from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import noData from '/assets/FoodAppimages/delete.png'
import DeleteConfirmation from '../../../shared/components/DeleteConfirmation/DeleteConfirmation';
const CategoriesList = () => {
    const [categoriesList, setCategoriesList] = useState([]);
    const [show, setShow] = useState(false);
        const [selectedID, setSelectedID] = useState(0);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setSelectedID(id)    
        setShow(true);}

    let getCategories = async () => {
        try {
            let response = await axios.get('https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1',
                {
                    headers: { Authorization: localStorage.getItem('token') },
                });
            console.log(response.data.data);

            setCategoriesList(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    let deletCategory=()=>{
        try {
            let response = axios.delete(`https://upskilling-egypt.com:3006/api/v1/Category/${selectedID}`,
                {
                    headers: { Authorization: localStorage.getItem('token') },
                }
            )
            console.log(response);
            
        } catch (error) {
            console.log(error);
            
        }
        handleClose()
    }

    useEffect(() => {
        getCategories()
    }, [])


    return (
        <>
            < Header title={"Categorie sList"} description={'You can now add your items that any user can order it from the Application and you can edit '} />



            
            <DeleteConfirmation deleteItem={'Category'} deletFun={deletCategory} toggleshow={() => setShow(true)} />
            <div className='d-flex justify-content-between p-4'>
                <h5>Categories Table Details</h5>
                <button className=' btn btn-success'>Add New Categorie</button>
            </div>
            <div className='p-4'>
                <table className="table m-2 p-5">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Creation Date</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoriesList.map((category, index) =>
                            <tr key={index}>
                                <td>{category.name}</td>
                                <td>{category.creationDate}</td>
                                <td className=''>
                                    <i onClick={()=>{handleShow(category.id)}} className='fa fa-trash mx-3 text-danger' aria-hidden='true'></i>
                                    <i className='fa fa-edit text-warning' aria-hidden='true'></i>

                                </td>
                            </tr>

                        )}
                    </tbody>
                </table>
            </div>

        </>
    );
}

export default CategoriesList;
