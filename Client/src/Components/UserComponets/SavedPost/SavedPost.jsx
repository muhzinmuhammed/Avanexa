import React, { useEffect, useState } from 'react'

import { Container, Col, Row, Button, Form, Pagination } from "react-bootstrap";
import axiosInstance from "../../../AxiosEndPoint/axiosEnd";
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const SavedPost = () => {
    const {id} =useParams()

    const baseUrl =
    "http://res.cloudinary.com/dfnwvbiyy/image/upload/v1694269781";
   

    const [post, setPost] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axiosInstance.get(`/user/saved_post/${id}`);
            setPost(response?.data?.savedPost)
          } catch (error) {
            toast.error(error.message);
          }
        };
      
        fetchData(); // Call the asynchronous function immediately
      
      }, []);
  return (
    <>
    <ToastContainer/>
    <>
    <Container style={{marginTop:'200px'}}>
    <Button href='/' className='btn btn-info text-white btn-sm' >Back To Home</Button>
    <Row className="mt-5">
          {post.map((post) => (
            <>
              <Col className="mt-5" xs={4}>
                <img
                  width={200}
                  height={200}
                  src={`${baseUrl}/${post?.imageUrl}`}
                  alt={`Post `}
                />
              </Col>
              <Col className="mt-5" xs={4}>
                <h1 style={{ wordBreak: "break-all" }} className="text-center">{post?.title}</h1>
                <h4 style={{ wordBreak: "break-all" }} className="text-center">
                  {post?.content}
                </h4>
                <p className="text-center" style={{ wordBreak: "break-all" }}>{post?.description}</p>
              </Col>
             
            </>
          ))}
        </Row>
    </Container>
      
    </>
    </>
  )
}

export default SavedPost
