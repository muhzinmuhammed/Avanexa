import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Col, Row, Button, Form, Pagination } from "react-bootstrap";
import axiosInstance from "../../../AxiosEndPoint/axiosEnd";
import { FaEdit } from "react-icons/fa";
import { IoPricetagOutline,IoPricetag } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const Home = () => {
  const [post, setPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3); // Adjust the number of posts per page
  const [searchValue, setSearchValue] = useState("");

  const baseUrl =
    "http://res.cloudinary.com/dfnwvbiyy/image/upload/v1694269781";
  const storedUserDataString = localStorage.getItem("userData");

  const storedUserData = storedUserDataString
    ? JSON.parse(storedUserDataString)
    : null;

  /*get all posts*/
  useEffect(() => {
    // Fetch data from your API using Axios
    axiosInstance
      .get(`/user/get_post/${storedUserData._id}`)
      .then((response) => {
        setPost(response.data.posts);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [storedUserData._id]);

  /*delete post*/
  const deletePost = async (id) => {
    try {
      // Show a confirmation sweet alert
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      // If the user clicks the confirm button
      if (result.isConfirmed) {
        // Make the delete request
        await axiosInstance.delete(`/user/delete_post/${id}`);

        // Show a success sweet alert
        Swal.fire("Deleted!", "Your post has been deleted.", "success");

        // Reload the page
        window.location.reload();
      }
    } catch (error) {
      // Show an error sweet alert
      Swal.fire("Error!", error?.message || "An error occurred.", "error");
    }
  };



  const handleUnTag=async(id)=>{
    try {
    console.log(id);
      
    await axiosInstance.patch(`/user/post_unsave/${id}`);
      window.location.reload();
      
    } catch (error) {
      toast.error(error?.message)
      
    }
  }


  const handleTag=async(id)=>{
    try {
      
      await axiosInstance.patch(`/user/post_save/${id}`);
      window.location.reload();
      
    } catch (error) {
      toast.error(error?.message)
      
    }
  }

  /* search post*/
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      if (searchValue) {
        const response = await axiosInstance.post(`/user/search`, {
          searchItem: searchValue,
        });
        setPost(response?.data.results);
        setCurrentPage(1); // Reset current page when searching
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  /* pagination */
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = post.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <ToastContainer />
      <Container style={{ marginTop: "200px" }}>
        <Row className="justify-content-between">
          <Form onSubmit={handleSearch}>
            <Col xs={12} md={6}>
              <div className="d-flex align-items-center">
                <input
                  type="text"
                  placeholder="Search ..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="form-control me-5"
                />
                <Button type="submit" className="btn btn-sm me-5 bg-info text-white">
                  Search
                </Button>
              </div>
            </Col>
          </Form>

          <Col xs={12} md={4}>
    <a href="/add_post" className="btn btn-lg bg-info mt-5 text-white">
      Add Note
    </a>
  </Col>
  <Col xs={12} md={4}>
    <a href={`/saved_post/${storedUserData._id}`} className="btn btn-lg bg-info mt-5 text-white">
      Tagged Post
    </a>
  </Col>
        </Row>

        <Row className="mt-5">
          {currentPosts.map((post) => (
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
              <Col className="mt-5 " xs={4}>
              <a style={{textDecoration:'none' }} href={`/edit_post/${post._id}`}>
  <FaEdit style={{ cursor: 'pointer',}} className="me-4" />
</a>
                {post?.star ? (
                          <Button
                            variant="none"
                            onClick={() => handleUnTag(post?._id)}
                          >
                            {" "}
                            <IoPricetag />
                          </Button>
                        ) : (
                          <Button
                            variant="none"
                            onClick={() => handleTag(post?._id)}
                          >
                            {" "}
                            <IoPricetagOutline />
                          </Button>
                        )}
                <MdDelete
                  style={{ cursor: "pointer" }}
                  onClick={() => deletePost(post?._id)}
                  className="me-4 "
                />
              </Col>
            </>
          ))}
        </Row>

        {/* Pagination */}
        <Pagination className="mt-3">
          {Array.from({ length: Math.ceil(post.length / postsPerPage) }).map(
            (item, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            )
          )}
        </Pagination>
      </Container>
    </>
  );
};

export default Home;
