import React, { Component } from 'react';
import Auxiliary from '../../HOC/Auxiliary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios_inst';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withError from '../../HOC/withError/WithError';
import { connect } from 'react-redux';
import { addIngredient, removeIngredient } from '../../Store/Actions/burgerCreator';
import { initIngredients } from '../../Store/Actions/burgerCreator';
import { purhcaseInit } from '../../Store/Actions/actionOrders';
import { setAuthRedirectPath } from '../../Store/Actions/AuthCreator'


class BurgerBuilder extends Component {

    constructor() {
        super();
        this.state = {
            purchasing: false,
            loading: false,
        }
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({
                purchasing: true
            })
        } else {
            this.props.onSetAuthRedirectPath('/review')
            this.props.history.push('/auth');
        }


    }

    closePurchaseHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    continuePurchaseHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push({
            pathname: "/review"
        })
    }

    render() {
        const disabledInfo = { ...this.props.ings };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        if (!this.state.loading && this.props.ings) {
            orderSummary = <OrderSummary hide={this.closePurchaseHandler}
                ingredients={this.props.ings}
                total={this.props.totalPrice}
                continue={this.continuePurchaseHandler} />
        }

        let burgerControls = null;
        if (this.props.ings) {
            burgerControls = (
                <Auxiliary>
                    <div>
                        <Burger ingredients={this.props.ings} />
                    </div>
                    <div>
                        <BuildControls
                            added={this.props.onIngredientAdded}
                            deducted={this.props.onIngredientDeleted}
                            disabled={disabledInfo}
                            price={this.props.totalPrice}
                            isAuth={this.props.isAuthenticated}
                            canPurchase={this.props.totalPrice > 0.1}
                            purchase={this.purchaseHandler} />
                    </div>
                </Auxiliary>
            )
        }
        else {
            burgerControls = this.props.error ? <h1>Major Error. Please refresh to retry</h1> : <Spinner />
        }

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} hide={this.closePurchaseHandler} >
                    {orderSummary}
                </Modal>
                {burgerControls}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        purchased: state.order.purchased,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingredient) => { dispatch(addIngredient(ingredient)) },
        onIngredientDeleted: (ingredient) => { dispatch(removeIngredient(ingredient)) },
        onInitIngredients: () => { dispatch(initIngredients()) },
        onInitPurchase: () => { dispatch(purhcaseInit()) },
        onSetAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withError(BurgerBuilder, axios));