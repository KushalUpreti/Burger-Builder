/* eslint-disable default-case */
import React, { Component } from 'react';

import Button from '../../../Components/UI/Button/Button';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios_inst';
import { withRouter } from "react-router";
import Input from '../../../Components/UI/Input/Input';
import { connect } from 'react-redux';
import withError from '../../../HOC/withError/WithError';
import { purchaseBurger } from '../../../Store/Actions/actionOrders';
import { validity } from '../../../Store/Utilities/Validity'

class ContactData extends Component {
    state = {
        form: {
            name: "",
            street: "",
            postal: "",
            country: "",
            email: "",
            select: "Fastest"
        },
        nameValidity: {
            rules: {
                required: true,
                minLength: 1
            },
            valid: false,
            touched: false
        },

        streetValidity: {
            rules: {
                minLength: 1
            },
            valid: false,
            touched: false
        },

        postalValidity: {
            rules: {
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        emailValidity: {
            rules: {
                required: true,
                minLength: 1
            },
            valid: false,
            touched: false
        },
        countryValidity: {
            rules: {
                required: true,
                minLength: 1
            },
            valid: false,
            touched: false
        },
        formIsValid: false
    }


    orderHandler = (event) => {

        event.preventDefault();

        const checkValidity = Object.keys(this.state).slice(1, 6);
        let counter = 0;
        for (const key of checkValidity) {
            if (this.state[key].valid === true) {
                counter++;
            }
        }

        if (counter !== 5 || this.props.totalPrice === 0) {
            return
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.totalPrice,
            personData: this.state.form,
            userId: this.props.userId
        }
        this.props.onOrderBurger(order, this.props.token);
    }

    inputChangedHandler = (event, type) => {
        const newForm = { ...this.state.form };
        newForm[type] = event.target.value;
        let rule = null;
        let validOrNot = null;
        let newValidity = null;

        switch (type) {
            case "name":
                rule = this.state.nameValidity.rules;
                validOrNot = validity(event.target.value, rule);
                newValidity = { ...this.state.nameValidity };
                newValidity.valid = validOrNot;
                newValidity.touched = true;
                this.setState({
                    form: newForm,
                    nameValidity: newValidity
                });
                break;

            case "email":
                rule = this.state.emailValidity.rules;
                validOrNot = validity(event.target.value, rule);
                newValidity = { ...this.state.emailValidity };
                newValidity.valid = validOrNot;
                newValidity.touched = true;
                this.setState({
                    form: newForm,
                    emailValidity: newValidity,
                });
                break;

            case "street":
                rule = this.state.streetValidity.rules;
                validOrNot = validity(event.target.value, rule);
                newValidity = { ...this.state.streetValidity };
                newValidity.valid = validOrNot;
                newValidity.touched = true;
                this.setState({
                    form: newForm,
                    streetValidity: newValidity
                });
                break;

            case "postal":
                rule = this.state.postalValidity.rules;
                validOrNot = validity(event.target.value, rule);
                newValidity = { ...this.state.postalValidity };
                newValidity.valid = validOrNot;
                newValidity.touched = true;
                this.setState({
                    form: newForm,
                    postalValidity: newValidity
                });
                break;

            case "country":
                rule = this.state.countryValidity.rules;
                validOrNot = validity(event.target.value, rule);
                newValidity = { ...this.state.countryValidity };
                newValidity.valid = validOrNot;
                newValidity.touched = true;
                this.setState({
                    form: newForm,
                    countryValidity: newValidity
                });
                break;
        }
    }

    render() {
        let form = (
            <form>
                <Input inputtype={"input"}
                    value={this.state.form.name}
                    changed={(event) => { this.inputChangedHandler(event, "name") }}
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    valid={this.state.nameValidity.valid ? 1 : 0}
                    touched={this.state.nameValidity.touched ? 1 : 0}
                />

                <Input inputtype={"input"}
                    value={this.state.form.email}
                    changed={(event) => { this.inputChangedHandler(event, "email") }}
                    type="email"
                    name="email"
                    placeholder="Your Mail"
                    valid={this.state.emailValidity.valid ? 1 : 0}
                    touched={this.state.emailValidity.touched ? 1 : 0}
                />

                <Input inputtype={"input"}
                    value={this.state.form.street}
                    changed={(event) => { this.inputChangedHandler(event, "street") }}
                    type="text"
                    name="street"
                    placeholder="Street"
                    valid={this.state.streetValidity.valid ? 1 : 0}
                    touched={this.state.streetValidity.touched ? 1 : 0}
                />

                <Input inputtype={"input"}
                    value={this.state.form.postal}
                    changed={(event) => { this.inputChangedHandler(event, "postal") }}
                    type="text"
                    name="postal"
                    placeholder="Postal Code"
                    valid={this.state.postalValidity.valid ? 1 : 0}
                    touched={this.state.postalValidity.touched ? 1 : 0}
                />

                <Input inputtype={"input"}
                    value={this.state.form.country}
                    changed={(event) => { this.inputChangedHandler(event, "country") }}
                    type="text"
                    name="country"
                    placeholder="Country"
                    valid={this.state.countryValidity.valid ? 1 : 0}
                    touched={this.state.countryValidity.touched ? 1 : 0}
                />

                <Input inputtype={"select"}
                    value={this.state.form.select}
                    changed={(event) => { this.inputChangedHandler(event, "select") }} />

                <Button inputtype={"input"}
                    btnType="Success"
                    clicked={this.orderHandler} >ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => { dispatch(purchaseBurger(orderData, token)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withError(ContactData, axios))); //wrapped to get history props