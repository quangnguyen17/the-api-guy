import React, { useState, useEffect, useRef } from 'react';
import { Row, Spinner, Button, ButtonToolbar } from 'react-bootstrap';
import { StyledLoadingView, StyledSearchBar } from '../StyleSheet';
import axios from 'axios';

const Main = () => {
    const [APIs, setAPIs] = useState([]);
    const [filteredAPIs, setFilterAPIs] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('Animals');
    const [categories, setCategories] = useState({});
    const searchInputRef = useRef();

    useEffect(() => {
        axios.get('https://api.publicapis.org/categories')
            .then(res => {
                const data = res.data;
                let fetchedCategories = {};

                for (var i = 0; i < data.length; i++) {
                    const category = data[i];
                    fetchedCategories[category] = 0;
                }

                setCategories(fetchedCategories);
                setSelectedCategory('Animals');
            })
            .catch(err => { /* TODO */ });
    }, []);

    useEffect(() => {
        if (categories.hasOwnProperty(selectedCategory)) {
            var data = categories[selectedCategory];
            if (data.length > 0) {
                setAPIs(categories[selectedCategory]);
            } else {
                const param = selectedCategory.toLowerCase().replace(' ', '+').replace('&', '%26');
                axios.get(`https://api.publicapis.org/entries?category=${param}`)
                    .then(res => {
                        const fetchedAPIs = res.data.entries;
                        setAPIs(fetchedAPIs);
                        setCategories({ ...categories, [selectedCategory]: fetchedAPIs });
                    })
                    .catch(err => { /* TODO */ });
            }

            setSearchText('');
            searchInputRef.current.value = '';
        }
    }, [selectedCategory, categories]);

    useEffect(() => {
        if (APIs.length > 0) {
            setFilterAPIs(APIs);
            setIsLoading(false);
        }
    }, [APIs]);

    useEffect(() => {
        const filtered = API => {
            const comparedSearchText = searchText.toLowerCase();
            const descriptionContains = API.Description.toLowerCase().includes(comparedSearchText);
            const nameContains = API.API.toLowerCase().includes(comparedSearchText);
            return descriptionContains || nameContains;
        }

        setFilterAPIs(APIs.filter(filtered));
    }, [searchText, APIs]);

    const categoryOnSelect = event => {
        event.preventDefault();
        const selected = event.target.innerText;
        if (selected !== selectedCategory) {
            setIsLoading(true);
            setSelectedCategory(selected);
        }
    }

    const searchTextOnChange = event => {
        event.preventDefault();
        setSearchText(event.target.value);
    }

    // Views
    const LoadingView = () => {
        return (
            <div style={StyledLoadingView} className="text-center mx-auto w-100 fade-in-fwd">
                <ul className="list-inline m-0 p-0">
                    <li className="m-0 p-0 my-3 align-middle">
                        <h4 className="m-0 d-inline-block text-secondary">Loading...</h4>
                    </li>
                    <li className="m-0 p-0 align-middle">
                        <Spinner animation="grow" variant="light" />
                        <Spinner animation="grow" variant="secondary" />
                        <Spinner animation="grow" variant="dark" />
                        <Spinner animation="grow" variant="secondary" />
                        <Spinner animation="grow" variant="light" />
                    </li>
                </ul>
            </div>
        );
    }

    const isSearching = () => searchText.length > 0;
    const upper = str => str.replace(/^\w/, c => c.toUpperCase());
    const TrueFalse = text => <span className={`text-${text === 'true' ? 'success' : 'danger'}`}>{text === 'true' ? 'Supported' : 'Not Supported'}</span>;
    const Cors = text => <span className={`text-${text === 'no' ? 'danger' : text === 'unknown' ? 'warning' : 'success'}`}>{upper(text)}</span>;

    const APIPreview = (API, index) => {
        return (
            <li key={index} className={`list-inline-item d-inline-block m-0 p-0 fade-in-fwd align-top`}>
                <div className={`p-5 m-2 API-box`}>
                    <h2 className="m-0 font-weight-bold">{API.API}</h2>
                    <small style={{ color: 'rgb(155, 155, 155)' }}>#{API.Category.replace(' ', '').toLowerCase()}</small><br />
                    <ul style={{ borderRadius: '8px' }} className="list-inline d-inline-block bg-light p-3 my-4">
                        <li className="code"><small>Auth: <span className="text-info">{API.Auth.length < 1 ? 'None' : upper(API.Auth)}</span></small></li>
                        <li className="code"><small>HTTPS: {TrueFalse(JSON.stringify(API.HTTPS))}</small></li>
                        <li className="code"><small>Cors: {Cors(API.Cors)}</small></li>
                    </ul><br />
                    <p className="m-0"><small>{API.Description}</small></p>
                    <a className="btn btn-sm m-0 btn-light px-3 mt-2 text-secondary rounded-pill" href={API.Link} rel="noopener noreferrer" target="_blank"><small>Read Docs</small></a>
                </div>
            </li>
        );
    }

    return (
        <>
            <div className="container-fluid m-0 px-5 pb-5">
                <Row className="p-0 m-5 text-center fade-in-top">
                    <ul className="list-inline m-0 p-0 w-100 text-center">
                        <li>
                            <p className="p-0 mx-auto text-secondary">Okay! So you're looking for an API to provide data for your applications, but you’re stuck. That’s why we’re here.<br />The API Guy will help you to find the perfect API that you want for your apps. <span role="img" aria-label="smiley">🤪</span></p>
                        </li>
                        <li>
                            <h2 className="mb-0 mx-auto">Let's get to scraping! <span aria-label="Cool Guy!" role="img">😎</span></h2>
                        </li>
                    </ul>
                </Row>
                <Row className="m-0 p-0 text-center">
                    <div style={{ animationDelay: '0.25s', overflow: 'hidden' }} className="w-100 mb-5 fade-in-top">
                        <ButtonToolbar className="d-inline-block mx-auto mt-4 px-4">
                            <p className="d-inline-block p-0 m-0 mr-2">Select a category: </p>
                            {Object.entries(categories).map((obj, idx) => (
                                <Button key={idx} className={`m-1 px-3 rounded-pill fade-in btn-${selectedCategory === obj[0] ? 'dark' : 'light'}`} onClick={categoryOnSelect}>{obj[0]}</Button>
                            ))}
                        </ButtonToolbar>
                        <ul className="list-inline p-0 mt-5 w-100">
                            <li>
                                <input ref={searchInputRef} onChange={searchTextOnChange} style={StyledSearchBar} placeholder="Search for APIs by names, cagories, descriptions, etc." className="p-3 rounded-pill tb-shadow" />
                            </li>
                            <li>
                                <p className="p-0 m-0 mt-3">Found {isSearching() ? filteredAPIs.length : APIs.length} APIs for {selectedCategory}{isSearching() ? `, with keyword '${searchText}'` : <></>}.</p>
                            </li>
                        </ul>
                    </div>
                    {isLoading ? LoadingView() : <ul className="list-inline m-0 p-0">
                        {isSearching() ? filteredAPIs.map(APIPreview) : APIs.map(APIPreview)}
                    </ul>}
                </Row>
            </div>
            <footer className="p-4 m-0 text-center">
                <p className="d-inline-block p-0 mb-2 mx-auto">
                    Showing API data from: <a className="btn btn-sm btn-light px-3 rounded-pill ml-2" href="https://github.com/davemachado/public-api" rel="noopener noreferrer" target="_blank">&#916; Public API</a>
                </p><br />
                <p className="text-secondary d-inline-block font-weight-light p-0">
                    <small> &copy; 2020 Quang Nguyen - <span><a className="text-secondary" href="https://github.com/quangnguyen17/the-api-guy" rel="noopener noreferrer" target="_blank">View Project Repo!</a></span></small>
                </p>
            </footer>
        </>
    );
}

export default Main;