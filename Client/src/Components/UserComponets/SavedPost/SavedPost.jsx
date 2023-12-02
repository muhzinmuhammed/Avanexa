import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Button } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from '../../../AxiosEndPoint/axiosEnd';

const SavedPost = () => {
  const { id } = useParams();
  const baseUrl = "http://res.cloudinary.com/dfnwvbiyy/image/upload/v1694269781";

  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/user/saved_post/${id}`);
        setPost(response?.data?.savedPost);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <ToastContainer />
      <Container style={{ marginTop: '200px' }}>
        <Button href='/' className='btn btn-info text-white btn-sm'>Back To Home</Button>
        
        {post.length === 0 ? (
          <div className="mt-5 text-center">
            <h2>No saved posts</h2>
          </div>
        ) : (
          <Row className="mt-5">
            {post.map((post) => (
              <React.Fragment key={post._id}>
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
              </React.Fragment>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}

export default SavedPost;
