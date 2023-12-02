import  { useState } from 'react'
import {Col,Container,Row,Button,Form,Card} from 'react-bootstrap'
import axiosInstance from "../../../AxiosEndPoint/axiosEnd";
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const AddPost = () => {
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [content,setContent] =useState('')
    const [imageUrl,setImageUrl]=useState('')
    
    const [cloudinaryURL,setCloudinaryURL]=useState('')
    const storedUserDataString = localStorage.getItem("userData");

    const storedUserData = storedUserDataString
      ? JSON.parse(storedUserDataString)
      : null;
  
      const navigate=useNavigate()
    function handleChange(e) {
        if (e.target.files && e.target.files.length > 0) {
            setImageUrl(e.target.files[0]);
        }
      }
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform photo upload first
        await handlePhotoUpload();
    
        // Check if the photo upload was successful
        if (!cloudinaryURL) {
          toast.error("Error uploading photo");
          return;
        }
    
        // Send the course data to your server
        axiosInstance
          .post("/user/add_post", {
            title,
            description,
            content,
            userId:storedUserData._id,
            imageUrl:cloudinaryURL
           
          })
          .then((response) => {
            console.log(response.data);
            
            toast.success("Post added successfully");
            setTimeout(() => {
                navigate("/");
                
            }, 1000);
          })
          .catch((error) => {
            console.error(error);
            toast.error("Error adding course");
          });
    };

    const handlePhotoUpload = async () => {
        try {
          const formData = new FormData();
          if (imageUrl) {
            formData.append("file", imageUrl);
            formData.append("upload_preset", "mtcgx5gz");
            formData.append("cloud_name", "dfnwvbiyy");
            const response = await axios.post(
              "https://api.cloudinary.com/v1_1/dfnwvbiyy/image/upload",
              formData
            );
    
            setCloudinaryURL(response.data.public_id);
          }
        } catch (error) {
          console.error("Error uploading photo:", error);
        }
      };

    return (
    <>
    <ToastContainer/>
     <Container className="shadow"  style={{ marginTop: "200px" }}>
        <Button href='/' className='btn btn-info text-white btn-sm' >Back To Home</Button>
        <Row>
        
          <Col  xs={12} md={12}>
            <Card>
              <Card.Body
                style={{ height: "500px", }}
              >
                <Form onSubmit={(e) => handleSubmit(e)}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="email">Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="email">Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="email">Content</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </Form.Group>

                  <div className="form-group">
          <label>Photo</label>
          <input
            type="file"
            className="form-control"
            accept="image/*" // Specify the file type
            onChange={handleChange}
          />
          {imageUrl && (
            <img
              src={URL.createObjectURL(imageUrl)}
              alt="Course"
              style={{ height: "100px", width: "100px" }}
            />
          )}
        </div>

                  <Button
                    type="submit"
                    style={{
                      backgroundColor: "  #1eb2a6 ",
                      border: "none",
                      color: "  #fff ",
                      marginLeft: "200px",
                      marginTop: "30px",
                    }}
                    className="w-50 btn-lg"
                  >
                   Sumbit
                  </Button>
                 
                </Form>
              
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      
    </>
  )
}

export default AddPost
