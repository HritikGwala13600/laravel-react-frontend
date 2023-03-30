import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';


export default function List() {
    // const navigate = useNavigate();
    // const {id} = useParams();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    },[]);

    const fetchCategories = async () => {
        await axios.get('http://localhost:8000/api/category').then(({ data }) => {
            setCategories(data.data);
        });
    }

    const deleteCat = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'blue',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then( (result) => {
            return result.isConfirmed;
        });
        if(!isConfirm){
            return;
        }
        await axios.delete(`http://localhost:8000/api/category/${id}`).then((data)=>{
            Swal.fire({
                icon : "success",
                text : data.data.message
            });
            fetchCategories();
        }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.data.message,
                icon:"error"
            })
        });
    }

    return (
        <div className="container">
            <h1 className='text-center mt-4 mb-4'>All Categories</h1>
            <div className="row">
                <div className='col-12'>
                    <Link className='btn btn-primary mb-3 text-uppercase' to={"/create"}>Create Category</Link>
                </div>
                <div className="col-12">
                    <div className="card card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered mb-0 text-center">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Image</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        categories.map( (value,key) => (
                                            
                                            <tr key={key}>
                                                <td>{value.title}</td>
                                                <td>{value.description}</td>
                                                <td><img width="50px" src={value.image} alt="No Image" /></td>
                                                <td>
                                                    <Button variant='danger' className='text-uppercase mx-2' onClick={()=>deleteCat(value.id)}>Delete</Button>
                                                    <Button variant='success' className='text-uppercase'>View</Button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


}