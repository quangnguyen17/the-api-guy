import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { APIListItem } from './Components';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './App.css';

const App = () => {
    const [categories, setCategories] = useState([]);
    const [APIs, setAPIs] = useState([]);
    const [filteredAPIs, setFilteredAPIs] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        (async () => {
            try {
                setCategories((await axios.get('https://api.publicapis.org/categories')).data);
                setAPIs((await axios.get('https://api.publicapis.org/entries')).data.entries);
            } catch (err) {
                alert(JSON.stringify(err));
            }
        })();
    }, []);

    useEffect(() => {
        if (selectedCategory.length > 0) {
            setFilteredAPIs(APIs.filter((API) => API.Category.toLowerCase() === selectedCategory.toLowerCase()));
        }
    }, [APIs, selectedCategory]);

    useEffect(() => {
        if (searchText.length > 0) {
            let searchedRes = [];
            if (selectedCategory.length > 0) {
                searchedRes = APIs.filter((API) => {
                    const containsSearchText = API.API.toLowerCase().includes(searchText.toLowerCase());
                    const containsCategory = API.Category.toLowerCase() === selectedCategory.toLowerCase();
                    return containsSearchText && containsCategory;
                });
            } else {
                searchedRes = APIs.filter((API) => API.API.toLowerCase().includes(searchText.toLowerCase()));
            }

            setFilteredAPIs(searchedRes);
        } else {
            if (selectedCategory.length > 0) {
                const filtered = APIs.filter((API) => API.Category.toLowerCase() === selectedCategory.toLowerCase());
                setFilteredAPIs(filtered);
            }
        }
    }, [searchText, APIs, selectedCategory]);

    return (
        <div className="App">
            <Container fluid className="p-4">
                <Row>
                    <Col md={3} className="pr-5">
                        <h5 className="font-weight-bold text-secondary mb-2">{categories.length} Categories</h5>
                        <ul className="list-inline">
                            {categories.map((category, idx) => (
                                <Button
                                    key={idx}
                                    onClick={(event) => setSelectedCategory(event.target.innerText)}
                                    className="list-inline-item m-1 py-1 px-2 rounded"
                                    variant={selectedCategory === category ? 'dark' : 'light'}
                                >
                                    {category}
                                </Button>
                            ))}
                        </ul>
                    </Col>
                    <Col md={9}>
                        <h1>The API Guy.</h1>
                        <input type="text" onChange={(event) => setSearchText(event.target.value)} placeholder="º Search for APIs" className="searchBar" />
                        {selectedCategory.length > 0 && (
                            <Button onClick={() => setSelectedCategory('')} size="sm" variant="info" className="py-1 px-2 align-middle mr-3 mb-4">
                                Show All
                            </Button>
                        )}
                        <h6 className="d-inline-block align-middle text-secondary mb-3">
                            {searchText.length > 0 ? 'Found' : 'Showing'}{' '}
                            {selectedCategory.length > 0 || searchText.length > 0 ? filteredAPIs.length : APIs.length} APIs{' '}
                            {selectedCategory.length > 0 ? `for ${selectedCategory}` : ''}
                        </h6>
                        <ul className="list-inline">
                            {selectedCategory.length > 0 || searchText.length > 0
                                ? filteredAPIs.map((API, idx) => <APIListItem key={idx} API={API} />)
                                : APIs.map((API, idx) => <APIListItem key={idx} API={API} />)}
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default App;
