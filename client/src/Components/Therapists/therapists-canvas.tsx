// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

import DataCard from '../DataCardCoun/data-card-coun';
import { getShortenedTimeAndDate } from '../../util/Helpers';
import { ITherapistsData } from './therapists-interfaces';
import SearchPage from '../SearchPage/search-page';
import { LocalizationContext } from './../LocalizationProvider';

// TODO: Remove hardcoded images
import therapist_sachin from './../../images/sachin_pic2.jpg';
import therapist_pratap from './../../images/pratap_pic.jpg';
import therapist_chandan from '../../images/chandan_pic.jpg';

interface ITherapistsProps {
    loading: boolean;
    query: string;
    filteredTherapistData: ITherapistsData[];
    handleInputChange: (therapist: any) => void;
}

const renderTherapists = (filteredTherapistData: ITherapistsData[]) => {
    return filteredTherapistData.map(therapist => {
        let src = therapist_sachin;
        if (therapist.name.match("Pratap")) {
            src = therapist_pratap;
        }
        else if (therapist.name.match("Chandan")) {
            src = therapist_chandan;
        }

        return (
            <DataCard
                key={therapist._id}
                match={{
                    url: '',
                    params: {}, isExact: false,
                    path: ''
                }}
                src={src}
                data={{
                    url: '/stuff',
                    title: therapist.name,
                    subtitle: therapist.Qualifications,
                    secondarySubtitle: therapist.location,
                    description: therapist.specialization,
                    footer : therapist.email,
                }}
            />
        );
    });
};

const TherapistsCanvas = (props: ITherapistsProps) => {
    const {
        loading,
        handleInputChange,
        query,
        filteredTherapistData
    } = props;

    const { getLocalizedString } = React.useContext(LocalizationContext);

    return (
        <SearchPage
            loading={loading}
            header={getLocalizedString("THERAPISTS_HEADER")}
            searchBarProps={{
                placeholder: getLocalizedString("THERAPISTS_INPUT_PLACEHOLDER"),
                query,
                handleInputChange
            }}
        >
            <div>
                Join us:- <a href="mailto: sachintiger1999@gmail.com">Send</a> Resume.
            </div>
            {renderTherapists(filteredTherapistData)}
        </SearchPage>
    );
}

export default TherapistsCanvas;