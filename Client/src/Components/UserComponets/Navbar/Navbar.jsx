
import  { useEffect } from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectUser, signup } from "../../../feature/userSlice";



function NavbarHeader() {
  const user = useSelector(selectUser) 
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
    dispatch(signup(parsedUserData));
  }, [dispatch]);

  const handleSignout = () => {
    localStorage.removeItem("userData");
    dispatch(logout());
  };

  return (
    <Navbar fixed="top" expand="lg" className="header">
      <Container>
        <Navbar.Brand className="logo" href="#">
        Avanexa
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto "
            
            navbarScroll
          >
           
         
           
          </Nav>
          {user ? (
            <>
             
             
              <h6 className="me-5">
                {user ? user?.name : ""}
              </h6>
             
              <Button
                
                onClick={handleSignout}
                className="buton1"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button className="button1">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="button2">Sign Up</Button>
              </Link>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarHeader;