// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from "react";
import { Link, match } from 'react-router-dom';
import * as classes from "./data-card-coun.css";
// var nodemailer = require('nodemailer');

type DataCardDataType = {
    url: string;
    title: string;
    subtitle?: string;
    secondarySubtitle?: string;
    rightText?: string;
    rightSubText?: string;
    rightImage?: string;
    description: string;
    footer?: string;
};

interface IDataCardProps {
    key: string;
    match: match<{}>;
    src?: string;
    data?: DataCardDataType;
}

// function mailing(){
     

//     var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'sachintiger1999@gmail.com',
//         pass: ''
//     }
//     });

//     var mailOptions = {
//     from: 'sachintiger1999@gmail.com',
//     to: 'sachinsahara2002@gmail.com',
//     subject: 'Sending Email using Node.js',
//     text: 'A client is waiting for you. Your Meeting id is : '
//     };

//     transporter.sendMail(mailOptions, function(error, info){
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     });
// }

const DataCard = (props: IDataCardProps): JSX.Element => {
    const { data, match, src } = props;
    let baseUrl = match.url;
    if (baseUrl.charAt(baseUrl.length - 1) == '/') {
        baseUrl = baseUrl.substring(0, baseUrl.length - 1);
    }

    return (
        <Link className={classes.DataCardLinkContainer} to={`http://localhost:4000/`} target="_blank">
            <div className={classes.ImageContainer}>
                <img src={src} className={classes.Image} />
            </div>
            <div className={classes.DataCardContainer}>
                <div style={{ flex: 1 }}>
                    <div className={classes.Title}>{data.title}</div>
                    {data.subtitle && <div className={classes.Subtitle}>{data.subtitle}</div>}
                    {data.secondarySubtitle && <div className={classes.SecondarySubtitle}>{data.secondarySubtitle}</div>}
                    <div>{data.description}</div>
                    {data.footer && <div className={classes.Footer}>{data.footer}</div>}
                </div>
                {data.rightText && <div style={{ marginLeft: 32, display: "flex", flexDirection: "row" }}>
                    <div style={{ display: "flex", flexDirection: "column", marginLeft: 8, alignItems: "flex-end" }}>
                        <div className={classes.Subtitle}>{data.rightText}</div>
                        {data.rightSubText && <div className={classes.Subtitle}>{data.rightSubText}</div>}
                    </div>
                </div>}
            </div>
        </Link >
    )
}

export default DataCard;