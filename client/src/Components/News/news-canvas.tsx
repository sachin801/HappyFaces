// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

import * as classes from "./news.css";
import { INewData } from './news-provider';
import { LocalizationContext } from './../LocalizationProvider';
import LoadingBubbles from './../LoadingBubbles/loading-bubbles';
import { CreateFormProvider } from './../CreateForm/create-form-provider';
import { FORM_TYPE } from './../CreateForm/create-form-interfaces';

interface INewsProps {
    newsData: INewData[];
    isLoading: boolean;
    submitNewsResponseHandler: (data: any) => void;
    submitNewsErrorHandler: (error: any) => void;
}

const renderNew = (newData: INewData, key: number) => (
    <div className={classes.NewContainer} key={key}>
        <h2 className={classes.Title}>{newData.title}</h2>
        <div className={classes.Description}>{newData.desc}</div>
        <a className={classes.Link} href={newData.link} target={"_blank"}>{newData.link}</a>
    </div>
);

const News = (props: INewsProps) => {
    const {
        newsData,
        isLoading,
        submitNewsResponseHandler,
        submitNewsErrorHandler
    } = props;
    const { getLocalizedString } = React.useContext(LocalizationContext);

    const news = newsData.map((newData, i) => renderNew(newData, i));

    const createFormParameters = {
        requestName: "createnew",
		header: getLocalizedString("NEWS_CREATE_FORM_HEADER"),
		fields: [
            {
                key: "title",
                type: FORM_TYPE.TEXT_INPUT,
                description: getLocalizedString("NEWS_CREATE_FORM_INPUT_TITLE")
            },
            {
                key: "desc",
                type: FORM_TYPE.TEXT_INPUT,
                description: getLocalizedString("NEWS_CREATE_FORM_INPUT_DESCRIPTION")
            },
            {
                key: "link",
                type: FORM_TYPE.TEXT_INPUT,
                description: getLocalizedString("NEWS_CREATE_FORM_INPUT_LINK")
            }
		]
    };

    return (
        <div className={classes.Container}>
            <h1 className={classes.Header}>{getLocalizedString("NEWS_HEADER")}</h1>
            <CreateFormProvider
                createFormParameters={createFormParameters}
                handleSubmitResponseHandler={submitNewsResponseHandler}
                handleSubmitErrorHandler={submitNewsErrorHandler}
            />
            {isLoading ? <LoadingBubbles isLoading={true} containerStyles={{width: "100%"}} /> : news}
        </div>  
    );
};

export default News;