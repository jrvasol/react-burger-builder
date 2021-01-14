import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

import {authLogout} from '../../../store/actions/auth';

const Logout = ({onLogout}) => {
    useEffect(() => {
        onLogout();
    }, [onLogout])

    return <Redirect to="/" />
}; 

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(authLogout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);