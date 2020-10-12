import React, { Component } from 'react';
import Modal from '../../Components/UI/Modal/Modal';
import Aux from '../Auxiliary';

const withError = (WrappedComponent, axios) => {


    return class extends Component {
        constructor(props) {
            super();
        }

        state = {
            error: null
        }

        componentWillMount() {
            axios.interceptors.request.use(request => {
                this.setState({
                    error: null
                })
                return request;
            });

            axios.interceptors.response.use(res => res, error => {
                this.setState({
                    error: error
                })
            })
        }

        errorConfirmed = () => {
            this.setState({
                error: null
            })
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} hide={this.errorConfirmed} >{this.state.error ? this.state.error.message : null}</Modal>
                    <WrappedComponent {...this.props}></WrappedComponent>
                </Aux>
            )
        }
    }

}

export default withError;