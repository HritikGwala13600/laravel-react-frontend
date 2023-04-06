import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Browser, Routes, Route, Link } from 'react-router-dom';

import Create from './components/Create';
import List from './components/List';
import Edit from './components/Edit';
function App() {
  return (
    // <Create />
    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <Browser>
            <Routes>
              <Route path="/create" element={<Create />} />
              <Route path='/edit/:id' element={<Edit />} />
              <Route path='/' element={<List />} />
            </Routes>
          </Browser>
        </Col>
      </Row>
    </Container>

  );
}

export default App;
