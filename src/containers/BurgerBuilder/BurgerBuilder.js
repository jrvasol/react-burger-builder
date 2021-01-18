import React, {Component} from 'react';
import Modal from 'react-modal';
import axios from '../../axios-orders';

import {connect} from 'react-redux';
import {addIngredient, removeIngredient, getIngredients} from '../../store/actions/burgerBuilder';
import {purchaseInit} from '../../store/actions/order';
import {setAuthRedirectPath} from '../../store/actions/auth';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

class BurgerBuilder extends Component {
    state = {
        showModal: false
    }

    componentDidMount() {
        this
            .props
            .getIngredients();
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }

    handleAddIngredient = (type) => {
        this
            .props
            .addIngredient(type);
    }

    handleRemoveIngredient = (type) => {
        this
            .props
            .removeIngredient(type);
    }

    handleOpenModal = () => {
        if(this.props.isAuthenticated) {
            this.setState({showModal: true})
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/login')
        }        
    }

    handleCloseModal = () => {
        this.setState({showModal: false})
    }

    handlePurchase = () => {
        this.props.onInitPurchase();
        this
            .props
            .history
            .push({pathname: '/checkout'});
    }

    updatePurchaseState = (ings) => {
        const ingredients = {
            ...ings
        }

        const sum = Object
            .keys(ingredients)
            .map((type) => {
                return ings[type];
            })
            .reduce((accumulator, val) => {
                return accumulator + val
            }, 0);

        return sum > 0;
    }

    render() {
        let burger = (
            <Aux>
                <Burger ingredients={this.props.ingredients}/>
                <BuildControls
                    addIngredient={this.handleAddIngredient}
                    removeIngredient={this.handleRemoveIngredient}
                    totalPrice={this.props.totalPrice}
                    ingredients={this.props.ingredients}
                    purchasable={this.updatePurchaseState(this.props.ingredients)}
                    isAuth={this.props.isAuthenticated}
                    setOpenModal={this.handleOpenModal}/>
            </Aux>
        );

        return (
            <Aux>
                {this.props.ingredients
                    ? burger
                    : (this.props.error
                        ? 'Something went wrong'
                        : <Spinner/>)}

                <Modal isOpen={this.state.showModal} onRequestClose={this.handleCloseModal}>
                    <OrderSummary
                        continuePurchase={this.handlePurchase}
                        setCloseModal={this.handleCloseModal}/>
                </Modal>
            </Aux>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingredient) => dispatch(addIngredient(ingredient)),
        removeIngredient: (ingredient) => dispatch(removeIngredient(ingredient)),
        getIngredients: () => dispatch(getIngredients()),
        onInitPurchase: () => dispatch(purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path))
    }
}

const mapStateToProps = ({burgerBuilder, auth}) => {
    return {ingredients: burgerBuilder.ingredients, totalPrice: burgerBuilder.totalPrice, error: burgerBuilder.error, isAuthenticated: auth.token !== null}
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));