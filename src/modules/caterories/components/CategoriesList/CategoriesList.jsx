import React, { useEffect, useState } from 'react';
import Header from '../../../shared/components/Header/Header';
import axios from 'axios';
import noData from '/assets/FoodAppimages/delete.png';
import DeleteConfirmation from '../../../shared/components/DeleteConfirmation/DeleteConfirmation';
import NoData from '../../../shared/components/NoData/NoData';
import { Modal, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const CategoriesList = () => {

    let {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleShow = (id) => {
        setSelectedID(id);
        setShow(true);
    };

    const [selectedID, setSelectedID] = useState();
    const [categoriesList, setCategoriesList] = useState([]);

    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    // Fetch categories list
    let getCategories = async () => {
        try {
            let response = await axios.get(
                'https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1',
                {
                    headers: { Authorization: localStorage.getItem('token') },
                }
            );
            console.log(response.data.data);
            setCategoriesList(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Add new category
    let onSubmit = async (data) => {
        try {
            let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Category/', data, {
                headers: { Authorization: localStorage.getItem('token') }
            });
            console.log(response.data);
            getCategories();  // Fetch updated categories list
            handleCloseAdd();  // Close the add modal
        } catch (error) {
            console.log(error);
        }
    };

    // Update existing category
    let onUpdate = async (data) => {
        try {
            const response = await axios.put(
                `https://upskilling-egypt.com:3006/api/v1/Category/${selectedID}`,  // Use selectedID for the category to be updated
                {
                    name: data.name,  // Send the updated category name
                },
                {
                    headers: { Authorization: localStorage.getItem('token') },
                }
            );
            console.log(response.data); // Log the response from the server
            getCategories();  // Fetch updated categories list
            handleCloseUpdate();  // Close the update modal
        } catch (error) {
            console.error("Error updating category: ", error);
        }
    };

    // Delete category
    const deleteCategory = async () => {
        try {
            await axios.delete(
                `https://upskilling-egypt.com:3006/api/v1/Category/${selectedID}`,
                {
                    headers: { Authorization: localStorage.getItem('token') },
                }
            );
            getCategories();  // Refresh the categories list after deletion
            handleClose();  // Close the delete confirmation modal
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCategories();  // Fetch categories when the component mounts
    }, []);

    return (
        <>
            <Header
                title={'Categories List'}
                description={
                    'You can now add your items that any user can order from the Application and you can edit '
                }
            />

            <DeleteConfirmation
                show={show}
                handleClose={handleClose}
                deleteItem={'Category'}
                deletFun={deleteCategory}
            />

            {/* Add Category Modal */}
            <Modal show={showAdd} onHide={handleCloseAdd}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <h4 className="m-3">Add Category</h4>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Category Name"
                                    aria-label="name"
                                    aria-describedby="basic-addon1"
                                    {...register('name', {
                                        required: true, // Make name field required
                                    })}
                                />
                            </div>
                            <button className="btn btn-success w-100 my-2">Save</button>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Update Category Modal */}
            <Modal show={showUpdate} onHide={handleCloseUpdate}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <h4 className="m-3">Update Category</h4>
                        <form onSubmit={handleSubmit(onUpdate)}>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Category Name"
                                    aria-label="update"
                                    aria-describedby="basic-addon1"
                                    {...register('name', {
                                        required: true, // Make name field required
                                    })}
                                />
                            </div>
                            <button className="btn btn-success w-100 my-2">Update</button>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Add Category Button */}
            <div className="d-flex justify-content-between p-4">
                <h5>Categories Table Details</h5>
                <button className="btn btn-success" onClick={handleShowAdd}>
                    Add New Category
                </button>
            </div>

            {/* Categories Table */}
            <div className="p-4">
                {categoriesList.length > 0 ? (
                    <table className="table m-2 p-5">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Creation Date</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categoriesList.map((category) => (
                                <tr key={category.id}>
                                    <td>{category.name}</td>
                                    <td>{category.creationDate}</td>
                                    <td>
                                        {/* Delete Icon */}
                                        <i
                                            onClick={() => handleShow(category.id)}
                                            className="fa fa-trash mx-3 text-danger"
                                            aria-hidden="true"
                                        ></i>

                                        {/* Edit Icon */}
                                        <i
                                            className="fa fa-edit text-warning"
                                            aria-hidden="true"
                                            onClick={() => {
                                                setSelectedID(category.id);  // Set the selected category ID for update
                                                handleShowUpdate();  // Open the update modal
                                            }}
                                        ></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <NoData />
                )}
            </div>
        </>
    );
};

export default CategoriesList;
