import React, { Component } from "react";
import Aux from '../../HOC/Auxiliary';
import classes from "./Layout.module.css";
import Toolbar from './Toolbar/Toolbar';
import SideDrawer from '../../Components/NavigationItems/SideDrawer/SideDrawer';
import { connect } from 'react-redux'

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    openDrawerHandler = () => {
        this.setState({
            showSideDrawer: true
        })
    }

    sideDrawerHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    openDrawer={this.openDrawerHandler} />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    isOpen={this.state.showSideDrawer} closed={this.sideDrawerHandler} />
                {/* Main contains the different pages */}
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);