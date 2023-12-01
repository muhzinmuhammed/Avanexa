import  { useState, useEffect } from "react";
import { Form, Card, Container, Button, Col, Row } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import {  signup } from "../../../feature/userSlice";


import NavbarHeader from "../Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axiosInstance from "../../../AxiosEndPoint/axiosEnd";

function Login() {
  const [useremail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const trimmedEmail = useremail.trim();
    const trimmedPassword = password.trim();
    if (trimmedEmail === "" || trimmedPassword === "") {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      const response = await axiosInstance.post("/user/login", {
        useremail: trimmedEmail,
        password: trimmedPassword,
      });
      const userdata = response.data;
      localStorage.setItem("userData", JSON.stringify(userdata));
      localStorage.setItem("userToken", JSON.stringify(userdata.token));

      dispatch(signup(userdata));
      navigate("/");

      toast.success("User created successfully.");
    } catch (error) {
      console.error(error);
      toast.error("User is blocked or please correct password");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <NavbarHeader />
      <ToastContainer />

      <Container className="shadow"  style={{ marginTop: "200px" }}>
        <Row>
        
          <Col className="ll" xs={12} md={12}>
            <Card>
              <Card.Body
                style={{ height: "320px", backgroundColor: "#1eb2a6 " }}
              >
                <Form onSubmit={(e) => handleSubmit(e)}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="email">Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={useremail}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="email">Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    style={{
                      backgroundColor: "  #fff ",
                      border: "none",
                      color: "  #1eb2a6 ",
                      marginLeft: "200px",
                      marginTop: "30px",
                    }}
                    className="w-50 btn-lg"
                  >
                    Log In
                  </Button>
                 
                </Form>
              
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;