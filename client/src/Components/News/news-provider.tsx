// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import React, { useState, useEffect } from 'react';

import { baseGetRequest } from "../../util/base-requests";
import NewsCanvas from './news-canvas';

export interface INewData {
    _id: string;
    title: string;
    desc: string;
    link: string;
};

export const News = () => {
    const [newsData, setNewsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const retrieveNewsResponseHandler = (data: any) => {
        setNewsData(data && data.news);
        setIsLoading(false);
    }

    const retrieveNewsErrorHandler = (error: any) => {
        console.error(error);
        setIsLoading(false);
    }

    const retrieveNews = () => {
        const params = [{}];
        baseGetRequest("getnews", params, retrieveNewsResponseHandler, retrieveNewsErrorHandler);
    }

    // TODO: Add progress indicator upon submission
    // Issue #42: Add progress indicator for submission of news creation

    const submitNewsResponseHandler = (data: any) => {
        // TODO: Add status message constants
        // Issue #43: Add status message constants in client
		if (data && data.statusMessage === 1) {
            retrieveNews();
        }
	}

	const submitNewsErrorHandler = (error: any) => {
        console.log(error);
	}

    useEffect(() => {
        retrieveNews();
    }, []);
    
    return (
        <NewsCanvas
            newsData={newsData}
            isLoading={isLoading}
            submitNewsResponseHandler={submitNewsResponseHandler}
            submitNewsErrorHandler={submitNewsErrorHandler}
        />
    );
}