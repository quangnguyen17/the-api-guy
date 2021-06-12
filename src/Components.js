import React from 'react';
import { Button } from 'react-bootstrap';

const lower = (str) => str.replace(/^\w/, (c) => c.toLowerCase());

export const APIListItem = ({ API }) => {
    return (
        <div className="api-card">
            <div className="w-100 d-flex justify-content-between align-items-center">
                <div className="mr-auto">
                    <h1>{API.API}</h1>
                    <p className="text-secondary">#{API.Category.replace(/ /g, '').toLowerCase()}</p>
                    <p className="my-2">{API.Description}</p>
                </div>
                <Button variant="light" href={API.Link} className="px-2 py-1 mb-auto">
                    Docs
                </Button>
            </div>
            <div className="mt-2">
                <div className="mb-1">
                    <span className="info-key">Auth:</span>
                    <code className="info-val text-info">{API.Auth.length < 1 ? 'none' : lower(API.Auth)}</code>
                </div>
                <div className="mb-1">
                    <span className="info-key">HTTPS:</span>
                    <code className={`info-val ${API.HTTPS === 'true' ? 'text-success' : 'text-danger'}`}>
                        {API.HTTPS === 'true' ? 'supported' : 'not-supported'}
                    </code>
                </div>
                <div className="mb-1">
                    <span className="info-key">Cors:</span>
                    <code className={`info-val ${API.Cors === 'yes' ? 'text-success' : 'text-danger'}`}>{API.Cors}</code>
                </div>
            </div>
        </div>
    );
};
