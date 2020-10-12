import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as actionTypes from '../../Store/Actions/actionTypes';
import { connect } from 'react-redux';
import { logout } from '../../Store/Actions/AuthCreator';

class Logout extends Component {

    componentDidMount() {
        this.props.onLogout();
    }

    render() {
        return (
            <Redirect to="/" />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(logout(actionTypes.AUTH_LOGOUT))
    }
}

export default connect(null, mapDispatchToProps)(Logout);