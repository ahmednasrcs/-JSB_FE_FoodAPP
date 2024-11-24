import React, { useEffect, useState } from 'react';
import Header from '../../../shared/components/Header/Header';
import axios from 'axios';
import DeleteConfirmation from '../../../shared/components/DeleteConfirmation/DeleteConfirmation';
import { imagbaseURl } from '../../../../services/urls/url';
import NoData from '../../../shared/components/NoData/NoData';
import { Link, useParams } from 'react-router-dom';

const RecipesList = () => {
    const [recipesList, setRecipesList] = useState([]);
    const [selectedID, setSelectedID] = useState();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = (id) => {
        setSelectedID(id);
        setShow(true);
    };
        // take gateory
    let getRecipes = async () => {
        try {
            const response = await axios.get(
                'https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=10&pageNumber=1',
                {
                    headers: { Authorization: localStorage.getItem('token') },
                }
            );
            setRecipesList(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };
        // api delet
    const deleteRecipe = async () => {
        try {
            await axios.delete(
                `https://upskilling-egypt.com:3006/api/v1/Recipe/${selectedID}`,
                {
                    headers: { Authorization: localStorage.getItem('token') },
                }
            );
            getRecipes();
            handleClose();
        } catch (error) {
            console.error(error);
        }
    };
        // علشان تنادي علي api اول ما يرن 
    useEffect(() => {
        getRecipes();
    }, []);



    return (
        <>
            <Header
                title="Recipes List"
                description="You can now add your items that any user can order it from the Application and you can edit"
            />
            <DeleteConfirmation
                show={show}
                handleClose={handleClose}
                deleteItem="Recipe"
                deletFun={deleteRecipe}
            />
            <div className="d-flex justify-content-between p-4">
                <h5>Recipes Table Details</h5>
                <Link to={"/dashboard/recipes/new-recipe"} className="btn btn-success">Add New Recipes</Link >
            </div>
            <div className="p-4">
                {recipesList.length > 0 ? (
                    <table className="table m-2 p-5">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Image</th>
                                <th scope="col">Price</th>
                                <th scope="col">Description</th>
                                <th scope="col">Category</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recipesList.map((recipe) => (
                                <tr key={recipe.id}>
                                    <td>{recipe.name}</td>
                                    <td>
                                        {recipe.imagePath ? (
                                            <img
                                                src={`${imagbaseURl}/${recipe.imagePath}`}
                                                alt={recipe.name}
                                                style={{
                                                    width: '100px',
                                                    height: '100px',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        ) : (
                                            <span>No image</span>
                                        )}
                                    </td>
                                    <td>{recipe.price}</td>
                                    <td>{recipe.description}</td>
                                    <td>{recipe.category[0]?.name}</td>
                                    <td>
                                        <span
                                            onClick={() => handleShow(recipe.id)}
                                            className="fa fa-trash mx-3 text-danger"
                                            style={{ cursor: 'pointer' }}
                                            aria-hidden="true" ></span>
                                            <Link to={`/dashboard/recipes/${recipe?.id}`}>
                                            <span
                                            className="fa fa-edit text-warning"
                                            style={{ cursor: 'pointer' }}
                                            aria-hidden="true"
                                        ></span>
                                    
                                            </Link>
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

export default RecipesList;
