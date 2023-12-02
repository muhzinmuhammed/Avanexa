import  { useState,useEffect } from 'react'
import {Col,Container,Row,Button,Form,Card} from 'react-bootstrap'
import axiosInstance from "../../../AxiosEndPoint/axiosEnd";
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const EditPost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
  
    const { id } = useParams();
    const storedUserDataString = localStorage.getItem('userData');
    const storedUserData = storedUserDataString ? JSON.parse(storedUserDataString) : null;
    const navigate = useNavigate();
  
    useEffect(() => {
      const getData = async (id) => {
        try {
          const res = await axiosInstance.get(`/user/edit_post/${id}`);
          console.log(res.data);
  
          res.data.editPost.forEach((item) => {
            setTitle(item?.title || '');
            setDescription(item?.description || '');
            setContent(item?.content || '');
          });
        } catch (error) {
          toast.error('Error fetching data');
        }
      };
  
      getData(id);
    }, [id]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

      
    
       
    
        // Send the course data to your server
        axiosInstance
          .put(`/user/upate_post/${id}`, {
            title,
            description,
            content,
            userId:storedUserData._id,
            
           
          })
          .then((response) => {
            console.log(response.data);
            
            toast.success("Post update successfully");
            setTimeout(() => {
                navigate("/");
                
            }, 1000);
          })
          .catch((error) => {
            console.error(error);
            toast.error("Error adding course");
          });
    };

 
    return (
        <>
        <ToastContainer />
        <Button style={{ marginTop: '100px' }} href="/" className="btn btn-info text-white ms-5 btn-sm">
            Back To Home
          </Button>
        <Container className="shadow" style={{ marginTop: '30px' }}>
         
          <Row>
            <Col xs={12} md={12}>
              <Card>
                <Card.Body style={{ height: '500px' }}>
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
  
                    <Button
                      type="submit"
                      style={{
                        backgroundColor: ' #1eb2a6 ',
                        border: 'none',
                        color: ' #fff ',
                        marginLeft: '200px',
                        marginTop: '30px',
                      }}
                      className="w-50 btn-lg"
                    >
                      Update
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

export default EditPost
