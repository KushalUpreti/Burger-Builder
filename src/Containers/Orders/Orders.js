import React, { Component } from 'react';
import Order from '../../Components/Order/Order';
import axios from '../../axios_inst';
import withErrorHandler from '../../HOC/withError/WithError';
import { fetchOrders } from '../../Store/Actions/actionOrders'
import { connect } from 'react-redux';
import Spinner from '../../Components/UI/Spinner/Spinner'

class Orders extends Component {

    componentWillMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {

            if (this.props.order.length === 0) {
                orders = <h1>No Orders Made</h1>
            } else {
                orders = this.props.order.map((item) => {
                    return (<Order key={item.id}
                        ingredients={item.ingredients}
                        price={item.price} />);
                })
            }
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        order: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token, userId) => { dispatch(fetchOrders(token, userId)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));