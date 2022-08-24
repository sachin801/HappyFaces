// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { baseGetRequest } from '../../util/base-requests';
import TherapistsCanvas from './therapists-canvas';

const Therapists = () => {
    const [query, setQuery] = useState("");
    const [therapistData, setTherapistData] = useState([]);
    const [filteredTherapistData, setFilteredTherapistData] = useState([]);
    const [loading, setLoading] = useState(true);

    const retrieveTherapistsResponseHandler = (data: any) => {
        setTherapistData(data.therapists);
        setFilteredTherapistData(data.therapists);
        setLoading(false);
    }

    const retrieveTherapistsErrorHandler = (error: any) => {
        console.log(error);
    }

    const retrieveTherapists = () => {
        baseGetRequest("gettherapists", [], retrieveTherapistsResponseHandler, retrieveTherapistsErrorHandler);
    }

    const handleInputChange = (therapist: any) => {
        const query = therapist.target.value;
        setQuery(query);

        const filteredTherapistData = therapistData.filter((element: any) => {
            const queryInLowerCase = query.toLowerCase();
            return element.name.toLowerCase().includes(queryInLowerCase) 
                || element.specialization.toLowerCase().includes(queryInLowerCase)
                || element.location.toLowerCase().includes(queryInLowerCase);
        });
        setFilteredTherapistData(filteredTherapistData);
    };

    useEffect(() => {
        retrieveTherapists();
    }, []);

    return (
        <TherapistsCanvas
            loading={loading}
            handleInputChange={handleInputChange}
            query={query}
            filteredTherapistData={filteredTherapistData}
        />
    );
}

export default withRouter(Therapists);