import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams , Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';


export default function Edit() {
  const navigate = useNavigate();
  const {id} = useParams();

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [validationError, setValidationError] = useState({})

  useEffect(() => {
    fetchProduct()
  }, [])

  const fetchProduct = async () => {
    await axios.get(`http://localhost:8000/api/category/${id}`).then(({ data }) => {
      const { title, description , image } = data.data
      setTitle(title)
      setDescription(description)
      setImage(image)
      setImagePreview(image)
    }).catch((error) => {
        console.log(error);
    })
  }
  // setImagePreview(image);
  const changeHandler = (event) => {
    setImagePreview(URL.createObjectURL(event.target.files[0]));
    setImage(event.target.files[0]);
  };

  const updateCategory = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('_method', 'PATCH');
    formData.append('title', title)
    formData.append('description', description)
    formData.append('image', image)
    console.log(formData);

    await axios.post(`http://localhost:8000/api/category/${id}`, formData).then(({ data }) => {
      if(data.status == true){
        Swal.fire({
          icon: "success",
          text: data.message
        })
        navigate("/")
      }else{
        Swal.fire({
          icon: "error",
          text: data.message
        })
      }
    }).catch(({ response }) => {
        console.log(response);
    })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Update Product</h4>
              <hr />
              <div className="form-wrapper">
                {
                  Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validationError).map(([key, value]) => (
                                <li key={key}>{value}</li>
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }
                <Form onSubmit={updateCategory}>
                  <Row>
                    <Col>
                      <Form.Group controlId="Name">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={title} onChange={(event) => {
                          setTitle(event.target.value)
                        }} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="my-3">
                    <Col>
                      <Form.Group controlId="Description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} value={description} onChange={(event) => {
                          setDescription(event.target.value)
                        }} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="Image" className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" onChange={changeHandler} />
                        <img className='mt-4' width="250px" src={imagePreview} alt="No Image" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" className="mt-2" size="md" block="block" type="submit">
                    Update
                  </Button>
                  <Link className="btn btn-dark mt-2 mx-2" size="md" block="block" to={"/"}> Back </Link>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

