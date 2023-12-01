import { useEffect,useState } from "react";
import {  toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Container,Col,Row, Button} from 'react-bootstrap'
import axiosInstance from "../../../AxiosEndPoint/axiosEnd";
import { FaEdit,FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci"
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';


const Home = () => {
    const [post,setPost]=useState([])
    const baseUrl =
    "http://res.cloudinary.com/dfnwvbiyy/image/upload/v1694269781";
    const storedUserDataString = localStorage.getItem("userData");

    const storedUserData = storedUserDataString
      ? JSON.parse(storedUserDataString)
      : null;
      
    useEffect(() => {
        // Fetch data from your API using Axios
        axiosInstance
          .get(`/user/get_post/${storedUserData._id}`)
          .then((response) => {
            console.log(response.data);
            setPost(response.data.posts);
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }, [storedUserData._id]);
      const deletePost = async (id) => {
        try {
            // Show a confirmation sweet alert
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You won\'t be able to revert this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });
    
            // If the user clicks the confirm button
            if (result.isConfirmed) {
                // Make the delete request
                await axiosInstance.delete(`/user/delete_post/${id}`);
                
                // Show a success sweet alert
                Swal.fire(
                    'Deleted!',
                    'Your post has been deleted.',
                    'success'
                );
    
                // Reload the page
                window.location.reload();
            }
        } catch (error) {
            // Show an error sweet alert
            Swal.fire(
                'Error!',
                error?.message || 'An error occurred.',
                'error'
            );
        }
    }
  return (
    <>
   
    <ToastContainer/>
    <Container style={{ marginTop: "200px" }}>
    <Row className="justify-content-end">
      <Col xs={12} md={4}>
        <input
          type="text"
          placeholder="Search products..."
          className="form-control"
        />
      </Col>
      <Col xs={12} md={4}>
        
      </Col>
      <Col xs={12} md={4} className="float-end">
       <Button href="/add_post" className="bg-info text-white btn-lg">Add Note</Button>
      </Col>
    </Row>
        <Row className="mt-5"> 
        {
        post?.map((post) => (
            <>
                <Col className="mt-5" xs={4}>
                    <img width={200} height={200} src={`${baseUrl}/${post?.imageUrl}`} alt={`Post `} />
                </Col>
                <Col className="mt-5" xs={4}>
                    <h1 className="text-center">{post?.title}</h1>
                    <h4 style={{wordBreak:'break-all'}} className="text-center">{post?.content}</h4>
                    <p style={{wordBreak:'break-all'}}>{post?.description}</p>
                </Col>
                <Col className="mt-5 " xs={4}>
                <FaEdit  className="me-4" />
                <CiStar  className="me-4" />
                <MdDelete onClick={() => deletePost(post?._id)} className="me-4"/>
                </Col>
            </>
        ))
    }
           
        </Row>
    </Container>

      
    </>
  )
}

export default Home
