import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavBar, APIListItem } from "./Components";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./App.css";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [APIs, setAPIs] = useState([]);
  const [filteredAPIs, setFilteredAPIs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    axios
      .get("https://api.publicapis.org/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.log(err));
    axios
      .get("https://api.publicapis.org/entries")
      .then(res => setAPIs(res.data.entries))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (selectedCategory.length > 0) {
      setFilteredAPIs(
        APIs.filter(
          API => API.Category.toLowerCase() === selectedCategory.toLowerCase()
        )
      );
    }
  }, [APIs, selectedCategory]);

  useEffect(() => {
    if (searchText.length > 0) {
      let searchedRes = [];
      if (selectedCategory.length > 0) {
        searchedRes = APIs.filter(API => {
          const containsSearchText = API.API.toLowerCase().includes(
            searchText.toLowerCase()
          );
          const containsCategory =
            API.Category.toLowerCase() === selectedCategory.toLowerCase();
          return containsSearchText && containsCategory;
        });
      } else {
        searchedRes = APIs.filter(API =>
          API.API.toLowerCase().includes(searchText.toLowerCase())
        );
      }

      setFilteredAPIs(searchedRes);
    } else {
      if (selectedCategory.length > 0) {
        const filtered = APIs.filter(
          API => API.Category.toLowerCase() === selectedCategory.toLowerCase()
        );
        setFilteredAPIs(filtered);
      }
    }
  }, [searchText, APIs, selectedCategory]);

  return (
    <div className="App">
      <Container fluid className="p-5">
        <NavBar />
        <Row className="mt-5">
          <Col md={9} className="pr-5">
            <input
              type="text"
              onChange={event => setSearchText(event.target.value)}
              placeholder="º Search for APIs"
              className="w-100 h3 mb-5 border-0 font-weight-normal"
            />
            {selectedCategory.length > 0 && (
              <Button
                onClick={() => setSelectedCategory("")}
                size="sm"
                variant="info"
                className="py-1 px-2 align-middle mr-3 mb-4"
              >
                Show All
              </Button>
            )}
            <h6 className="d-inline-block align-middle mb-4">
              Showing{" "}
              {selectedCategory.length > 0 || searchText.length > 0
                ? filteredAPIs.length
                : APIs.length}{" "}
              APIs{" "}
              {selectedCategory.length > 0 ? `for ${selectedCategory}` : ""}
            </h6>
            <ul className="list-inline">
              {selectedCategory.length > 0 || searchText.length > 0
                ? filteredAPIs.map((API, idx) => (
                    <APIListItem key={idx} API={API} />
                  ))
                : APIs.map((API, idx) => <APIListItem key={idx} API={API} />)}
            </ul>
          </Col>
          <Col md={3}>
            <h5>{categories.length} Categories</h5>
            <ul className="list-inline mt-4">
              {categories.map((category, idx) => (
                <Button
                  onClick={event => setSelectedCategory(event.target.innerText)}
                  key={idx}
                  className="list-inline-item m-1 py-1 px-2 rounded"
                  variant={selectedCategory === category ? "dark" : "light"}
                >
                  {category}
                </Button>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
