import React, { Component } from 'react';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import classes from './Auth.module.css';
import { auth } from '../../Store/Actions/AuthCreator';
import { connect } from 'react-redux';
import Spinner from '../../Components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { validity } from '../../Store/Utilities/Validity';

class Auth extends Component {

    state = {
        form: {
            name: "",
            email: "",
            password: ""
        },
        nameValidity: {
            rules: {
                required: true,
                minLength: 1
            },
            valid: false,
            touched: false
        },
        emailValidity: {
            rules: {
                required: true,
                minLength: 1,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        passwordValidity: {
            rules: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        },
        isSignUp: true
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {

        }
    }

    checkValidity(value, rules) {
        let isValid = true;


        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
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

            case "password":
                rule = this.state.passwordValidity.rules;
                validOrNot = validity(event.target.value, rule);
                newValidity = { ...this.state.passwordValidity };
                newValidity.valid = validOrNot;
                newValidity.touched = true;
                this.setState({
                    form: newForm,
                    passwordValidity: newValidity
                });
                break;

            default:
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.form.email, this.state.form.password, this.state.isSignUp);
    }

    switchAuthModeHandler = (event) => {
        event.preventDefault();
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp }
        });
    }

    render() {
        let content = <Spinner />
        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <h2 style={{ color: "red" }}>{this.props.error.message}</h2>
            )
        }

        if (!this.props.loading) {
            content = <form className={classes.Auth} onSubmit={this.submitHandler}>
                {errorMessage}
                <Input inputtype={"input"}
                    value={this.state.form.name}
                    changed={(event) => { this.inputChangedHandler(event, "name") }
                    }
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    valid={this.state.nameValidity.valid ? 1 : 0}
                    touched={this.state.nameValidity.touched ? 1 : 0}
                />
                <Input inputtype={"input"}
                    value={this.state.form.email}
                    changed={(event) => { this.inputChangedHandler(event, "email") }}
                    type="text"
                    name="email"
                    placeholder="Your Email"
                    valid={this.state.emailValidity.valid ? 1 : 0}
                    touched={this.state.emailValidity.touched ? 1 : 0}
                />
                <Input inputtype={"password"}
                    value={this.state.form.password}
                    changed={(event) => { this.inputChangedHandler(event, "password") }}
                    type="password"
                    name="password"
                    placeholder="Password"
                    valid={this.state.passwordValidity.valid ? 1 : 0}
                    touched={this.state.passwordValidity.touched ? 1 : 0}
                />
                <Button btnType="Success">SUBMIT</Button>
                <Button clicked={this.switchAuthModeHandler} btnType="Danger">Switch To {this.state.isSignUp ? "SignIn" : "SignUp"}</Button>
            </form >
        }
        if (this.props.isAuthenticated) {
            content = <Redirect to={this.props.authRedirectPath} />
        }
        return (
            <div>
                { content}
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUp) => { dispatch(auth(email, password, isSignUp)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);