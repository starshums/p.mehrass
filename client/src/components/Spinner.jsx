import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Spinner = () => {

    return (
        <Fragment>
            <FontAwesomeIcon className="loadingSpinner" icon={ faSpinner} color="orangered" size="lg" spin />
        </Fragment>
    )
}

export default Spinner;