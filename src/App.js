import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Router } from '@reach/router';
// Components
// import Main from './components/Main';
// import { NavBar, ComingSoon } from './components/Components';

// CSS, Bootstrap
import { Container, Navbar, Nav, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [categories, setCategories] = useState([]);
  const [APIs, setAPIs] = useState([]);
  const [filteredAPIs, setFilteredAPIs] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    axios.get("https://api.publicapis.org/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.log(err));
    axios.get("https://api.publicapis.org/entries")
      .then(res => setAPIs(res.data.entries))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (selectedCategory.length > 0) {
      const filtered = APIs.filter(API => API.Category.toLowerCase() === selectedCategory.toLowerCase());
      setFilteredAPIs(filtered);
    }
  }, [APIs, selectedCategory]);

  useEffect(() => {
    if (searchText.length > 0) {
      let searchedRes = [];
      if (selectedCategory.length > 0) {
        searchedRes = APIs.filter(API => {
          const containsSearchText = API.API.toLowerCase().includes(searchText.toLowerCase());
          const containsCategory = API.Category.toLowerCase() === selectedCategory.toLowerCase();
          return containsSearchText && containsCategory;
        });
      } else {
        searchedRes = APIs.filter(API => API.API.toLowerCase().includes(searchText.toLowerCase()));
      }

      setFilteredAPIs(searchedRes);
    } else {
      if (selectedCategory.length > 0) {
        const filtered = APIs.filter(API => API.Category.toLowerCase() === selectedCategory.toLowerCase());
        setFilteredAPIs(filtered);
      }
    }
  }, [searchText, APIs, selectedCategory]);

  const lower = str => str.replace(/^\w/, c => c.toLowerCase());
  const TrueFalse = text => <span className={`text-${text === 'true' ? 'success' : 'danger'}`}>&#60;{text === 'true' ? 'supported' : 'not-supported'}&#62;</span>;
  const Cors = text => <span className={`text-${text === 'no' ? 'danger' : text === 'unknown' ? 'warning' : 'success'}`}>&#60;{lower(text)}&#62;</span>;

  const APIListItem = ({ API }) => (
    <li className="list-inline mb-4">
      <h1>{API.API}</h1>
      <ul className="list-inline float-right">
        <li className="list-inline-item text-center">
          <pre>Auth</pre>
          <h6 className="text-info mt-1 mx-2">&#60;{API.Auth.length < 1 ? 'none' : lower(API.Auth)}&#62;</h6>
        </li>
        <li className="list-inline-item text-center">
          <pre>HTTPS</pre>
          <h6 className="mt-1 mx-2">{TrueFalse(JSON.stringify(API.HTTPS))}</h6>
        </li>
        <li className="list-inline-item text-center">
          <pre>Cors</pre>
          <h6 className="mt-1 mx-2">{Cors(API.Cors)}</h6>
        </li>
      </ul>
      <p className="text-secondary">#{API.Category.replace(/ /g, '').toLowerCase()}</p>
      <p className="mt-2 mb-1">{API.Description}</p>
      <a className="text-secondary" href={API.Link} target="_blank" rel="noopener noreferrer">Read Docs</a>
    </li>
  );

  return (
    <div className="App">
      <Container className="mx-auto py-5">
        <Navbar>
          <h1 className="display-4">The API Guy.</h1>
          <Nav className="ml-auto justify-content-end">
            <Nav.Link>What is an API?</Nav.Link>
            <Nav.Link>How to use it?</Nav.Link>
          </Nav>
        </Navbar>
        <Row className="mt-5">
          <Col md={9} className="pr-5">
            <input onChange={event => setSearchText(event.target.value)} type="text" placeholder="&#9740; Search for APIs" className="w-100 h3 mb-5 border-0 font-weight-normal" />
            {selectedCategory.length > 0 && <Button onClick={() => setSelectedCategory('')} size="sm" variant="info" className="py-1 px-2 align-middle mr-3 mb-4">Show All</Button>}
            <h5 className="d-inline-block align-middle mb-4">Showing {selectedCategory.length > 0 || searchText.length > 0 ? filteredAPIs.length : APIs.length} APIs {selectedCategory.length > 0 ? `for ${selectedCategory}` : ''}</h5>
            <ul className="list-inline">
              {selectedCategory.length > 0 || searchText.length > 0 ? filteredAPIs.map((API, idx) => <APIListItem key={idx} API={API} />) : APIs.map((API, idx) => <APIListItem key={idx} API={API} />)}
            </ul>
          </Col>
          <Col md={3}>
            <h5>{categories.length} Categories</h5>
            <ul className="list-inline mt-4">
              {categories.map((category, idx) => (
                <Button onClick={event => setSelectedCategory(event.target.innerText)} key={idx} className="list-inline-item m-1 py-1 px-2 rounded" variant={selectedCategory === category ? 'dark' : 'light'}>{category}</Button>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;