import React, { useState, useEffect, useRef } from 'react';
import { Row, Spinner, Button, ButtonToolbar } from 'react-bootstrap';
import { StyledLoadingView, StyledSearchBar } from '../StyleSheet';
import axios from 'axios';

const Main = () => {
    const [APIs, setAPIs] = useState(null);
    // const [filteredAPIs, setFilterAPIs] = useState([]);
    // const [searchText, setSearchText] = useState('');
    // const [isLoading, setIsLoading] = useState(true);
    // const [selectedCategory, setSelectedCategory] = useState('Animals');
    // const [categories, setCategories] = useState({});
    // const searchInputRef = useRef();

    useEffect(() => {
        axios.get("https://api.publicapis.org/entries")
            .then(res => {
                const groupedAPIs = res.data.entries.reduce((grouped, obj) => {
                    grouped.hasOwnProperty(obj.Category) ? grouped[obj.Category].push(obj) : grouped[obj.Category] = [obj];
                    return grouped;
                }, {});

                setAPIs(groupedAPIs);
            })
            .catch(err => { /* TODO */ });
    }, []);

    // useEffect(() => {
    //     axios.get('https://api.publicapis.org/categories')
    //         .then(res => {
    //             const data = res.data;
    //             let fetchedCategories = {};

    //             for (var i = 0; i < data.length; i++) {
    //                 const category = data[i];
    //                 fetchedCategories[category] = 0;
    //             }

    //             setCategories(fetchedCategories);
    //             setSelectedCategory('Animals');
    //         })
    //         .catch(err => { /* TODO */ });
    // }, []);

    // useEffect(() => {
    //     if (categories.hasOwnProperty(selectedCategory)) {
    //         var data = categories[selectedCategory];
    //         if (data.length > 0) {
    //             setAPIs(categories[selectedCategory]);
    //         } else {
    //             const param = selectedCategory.toLowerCase().replace(' ', '+').replace('&', '%26');
    //             axios.get(`https://api.publicapis.org/entries?category=${param}`)
    //                 .then(res => {
    //                     const fetchedAPIs = res.data.entries;
    //                     setAPIs(fetchedAPIs);
    //                     setCategories({ ...categories, [selectedCategory]: fetchedAPIs });
    //                 })
    //                 .catch(err => { /* TODO */ });
    //         }

    //         setSearchText('');
    //         searchInputRef.current.value = '';
    //     }
    // }, [selectedCategory, categories]);

    // useEffect(() => {
    //     if (APIs.length > 0) {
    //         setFilterAPIs(APIs);
    //         setIsLoading(false);
    //     }
    // }, [APIs]);

    // useEffect(() => {
    //     const filtered = API => {
    //         const comparedSearchText = searchText.toLowerCase();
    //         const descriptionContains = API.Description.toLowerCase().includes(comparedSearchText);
    //         const nameContains = API.API.toLowerCase().includes(comparedSearchText);
    //         return descriptionContains || nameContains;
    //     }

    //     setFilterAPIs(APIs.filter(filtered));
    // }, [searchText, APIs]);

    // const categoryOnSelect = event => {
    //     event.preventDefault();
    //     const selected = event.target.innerText;
    //     if (selected !== selectedCategory) {
    //         setIsLoading(true);
    //         setSelectedCategory(selected);
    //     }
    // }

    // const searchTextOnChange = event => {
    //     event.preventDefault();
    //     setSearchText(event.target.value);
    // }

    // Views
    const LoadingView = () => {
        return (
            <div style={StyledLoadingView} className="text-center mx-auto w-100 fade-in-fwd">
                <ul className="list-inline m-0 p-0">
                    <li className="m-0 p-0 my-3 align-middle">
                        <h5 className="m-0 d-inline-block text-secondary">Loading...</h5>
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

    // const isSearching = () => searchText.length > 0;
    const upper = str => str.replace(/^\w/, c => c.toUpperCase());
    const TrueFalse = text => <span className={`text-${text === 'true' ? 'success' : 'danger'}`}>{text === 'true' ? 'Supported' : 'Not Supported'}</span>;
    const Cors = text => <span className={`text-${text === 'no' ? 'danger' : text === 'unknown' ? 'warning' : 'success'}`}>{upper(text)}</span>;

    return (
        <>
            <div className="container-fluid m-0 p-0">
                <Row className="m-0 p-0">
                    <ul className="list-inline p-0 w-100">
                        <li>
                            {/* <input ref={searchInputRef} onChange={searchTextOnChange} style={StyledSearchBar} placeholder="Search for APIs by names, cagories, descriptions, etc." className="p-3 rounded-pill tb-shadow" /> */}
                        </li>
                        <li>
                            {/* <p className="p-0 m-0 mt-3">Found {isSearching() ? filteredAPIs.length : APIs.length} APIs for {selectedCategory}{isSearching() ? `, with keyword '${searchText}'` : <></>}.</p> */}
                            <p>Browse under these categories:</p>
                        </li>
                    </ul>
                </Row>
                <Row className="m-0 p-0 text-center">
                    {APIs ? Object.keys(APIs).map((key, idx) => (
                        <div key={idx}>
                            <h5 className="mx-auto">{key} ({APIs[key].length})</h5>
                            <div style={{ overflowX: 'auto', width: '100vw' }}>
                                <table>
                                    <tbody>
                                        <tr className="pt-5">
                                            {APIs[key].map(((API, idx) => (
                                                <td key={idx} style={{ backgroundColor: 'white' }} className="fade-in-fwd align-top p-5 m-2 API-box">
                                                    <h1 className="m-0 font-weight-bold">{API.API}</h1>
                                                    <small style={{ color: 'rgb(155, 155, 155)' }}>#{API.Category.replace(' ', '').toLowerCase()}</small><br />
                                                    <ul style={{ borderRadius: '8px' }} className="list-inline d-inline-block bg-light p-3 my-4">
                                                        <li className="code"><small>Auth: <span className="text-info">{API.Auth.length < 1 ? 'None' : upper(API.Auth)}</span></small></li>
                                                        <li className="code"><small>HTTPS: {TrueFalse(JSON.stringify(API.HTTPS))}</small></li>
                                                        <li className="code"><small>Cors: {Cors(API.Cors)}</small></li>
                                                    </ul><br />
                                                    <p className="m-0"><small>{API.Description}</small></p>
                                                    <a className="btn btn-sm m-0 btn-light px-3 mt-2 text-secondary rounded-pill" href={API.Link} rel="noopener noreferrer" target="_blank"><small>Read Docs</small></a>
                                                </td>
                                            )))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )) : LoadingView()}

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