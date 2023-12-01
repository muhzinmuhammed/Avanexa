
import {  ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Container,Col,Row, Button} from 'react-bootstrap'

const Home = () => {
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
       <Button className="bg-info text-white btn-lg">Add Note</Button>
      </Col>
    </Row>
        <Row className="mt-5">
            <Col xs={8}>
                <h1>ddd</h1>
            </Col>
            <Col xs={4}>
                <h1>dddddddddd</h1>
            </Col>
        </Row>
    </Container>

      
    </>
  )
}

export default Home
