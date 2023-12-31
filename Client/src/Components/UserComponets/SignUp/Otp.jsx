import  { useState, useEffect } from "react";
import { Col, Row, Container, Form, Button, Alert } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {  signup } from "../../../feature/userSlice";
import axiosInstance from "../../../AxiosEndPoint/axiosEnd";
const UserOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [error, ] = useState("");
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(60);
  useEffect(() => {
    // Start the timer when the component mounts
    const countdown = setInterval(() => {
      // Decrement the timer by 1 second
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // Redirect to '/signup' when the timer reaches 0
    if (timer === 0) {
      navigate("/signup");
    }

    // Clean up the interval when the component unmounts
    return () => clearInterval(countdown);
  }, [timer, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        "/user/signup_verify",
        {
          otp,
        }
      );

      // Check the response status and handle success or error accordingly
      if (response.status === 200) {
        toast.success("Signup successful");
        const userdata = response.data;

       
        localStorage.setItem("userData", JSON.stringify(userdata));
        localStorage.setItem("userToken", JSON.stringify(userdata.token));
      
        

        dispatch(signup(userdata));

        navigate("/");
      } else {
        // If the response contains a data property with an error message, use it; otherwise, provide a generic error message
        const errorMessage =
          response.data && response.data.message
            ? response.data.message
            : "Wrong otp";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("An error occurred while verifying OTP:", error);
      toast.error("Wrong otp"); // Display a generic error message
    }
  };
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="bg-light vh-100 d-flex justify-content-center align-items-center">
      <Container>
        <ToastContainer />
        <Row className="d-flex justify-content-center mt-5">
          <Col xs={4}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicOTP">
                <Form.Label>Enter OTP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Please enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <span>Please check your mail</span>
              </Form.Group>
              <Button type="submit" className="w-100">
                Submit
              </Button>
            </Form>
            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}
            <div className="mt-3">
              Redirecting to signup page in {timer} seconds...
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserOtp;