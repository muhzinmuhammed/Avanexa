import  { useState } from "react";
import { Form, Card, Container,Col,Row,Button } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import NavbarHeader from "../Navbar/Navbar";

import axiosInstance from "../../../AxiosEndPoint/axiosEnd";

function Signup() {
  const [username, setName] = useState("");
  const [useremail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const isStrongPassword = (password) => {
    // Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(password);
  };

  const isPhoneNumberValid = (phone) => {
    // Phone number validation using a simple regex for demonstration purposes.
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const isNameValid = (username) => {
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return nameRegex.test(username);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = username.trim();
    const trimmedEmail = useremail.trim();
    const trimmedPhone = phone.trim();
    const trimmedPassword = password.trim();

    if (
      trimmedName === "" ||
      trimmedEmail === "" ||
      trimmedPhone === "" ||
      trimmedPassword === ""
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
if (!isNameValid(trimmedName)) {
  toast.error('Please correct name')
  
}
    if (!isStrongPassword(trimmedPassword)) {
      toast.error(
        "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters."
      );
      return;
    }

    if (password !== confirmpassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!isPhoneNumberValid(trimmedPhone)) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    try {
      const response = await axiosInstance.post('/user/register', {
        username: trimmedName,
        useremail: trimmedEmail,
        phone: trimmedPhone,
        password: trimmedPassword,
      });
      console.log(response.data);
      
      navigate('/user_otp');
    } catch (error) {
      console.error('An error occurred while registering:',);
      toast.error("An error occurred.");
    }
  };

  return (
   
      <>
        <NavbarHeader />
        <ToastContainer />
        <Container className="shadow">
         <Row>
         <Col className="ll" style={{ marginTop: "200px" }} xs={12} md={12}>
            <Card>
              <Card.Body
                style={{ height: "550px", backgroundColor: "#1eb2a6 " }}
              >
                <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="email">Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Full Name "
                      value={username}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="email">Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={useremail}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="email">Phone</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter email"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="email">Confirm-Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm-Password"
                      value={confirmpassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                    className="w-50"
                  >
                  Sign up
                  </Button>
                 
                </Form>
               
              </Card.Body>
            </Card>
          </Col>
         </Row>
        </Container>
  </>
    
  );
}

export default Signup;