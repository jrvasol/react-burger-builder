import React, {useState} from 'react';
import {connect} from 'react-redux';

import {purchaseBurger} from '../../../store/actions/order';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../axios-orders';
import {checkValidity} from '../../../shared/utility';

const ContactData = (props) => {
    const [orderForm,
        setOrderForm] = useState({
        name: {
            label: 'Name',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            label: 'Street',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Street Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            label: 'Zip Code',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your zip code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        email: {
            label: 'E-Mail Address',
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your email address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            label: 'Delivery Method',
            elementType: 'select',
            elementConfig: {
                options: [
                    {
                        value: 'fastest',
                        displayName: 'Fastest'
                    }, {
                        value: 'cheapest',
                        displayName: 'Cheapest'
                    }
                ]
            },
            value: 'cheapest',
            valid: true
        }
    });

    const [isFormValid,
        setFormValid] = useState(false);

    const handleOrder = (event) => {
        event.preventDefault();
        const formData = {};

        for (let key in orderForm) {
            formData[key] = orderForm[key].value;
        }

        const order = {
            ingredients: props.ingredients,
            price: props.totalPrice,
            customerData: formData,
            userId: props.userId
        }

        props.purchaseBurger(order, props.token);
    }

    const handleValueChange = (event, id) => {
        const val = event.target.value;

        const updatedOrderForm = {
            ...orderForm,
            [id]: {
                ...orderForm[id],
                value: val,
                valid: checkValidity(val, orderForm[id].validation),
                touched: true
            }
        };

        let formValid = true;
        for (let key in updatedOrderForm) {
            formValid = updatedOrderForm[key].valid && formValid;
        }

        setFormValid(formValid);
        setOrderForm(updatedOrderForm);
    }

    const formElement = [];
    for (const [key,
        value]of Object.entries(orderForm)) {
        formElement.push({id: key, config: value});
    }

    return (
        <div>
            <h4>Enter your Contact Data</h4>
            <form onSubmit={handleOrder}>
                {formElement.map(({id, config}) => (<Input
                    name={id}
                    key={id}
                    elementConfig={config.elementConfig}
                    isInvalid={!config.valid}
                    shouldValidate={config.validation}
                    touched={config.touched}
                    elementType={config.elementType}
                    handleValueChange={(event) => {
                    handleValueChange(event, id)
                }}
                    value={config.value}/>))
}
                {props.isLoading
                    ? <Spinner/>
                    : <Button btnType="Success" clicked={handleOrder} disabled={!isFormValid}>Order</Button>}
            </form>
        </div>
    )
};

const mapStateToProps = ({burgerBuilder, order, auth}) => ({token: auth.token, ingredients: burgerBuilder.ingredients, isLoading: order.loading, totalPrice: burgerBuilder.totalPrice, userId: auth.userId});

const mapDispatchToProps = dispatch => {
    return {
        purchaseBurger: (orderData, token) => dispatch(purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));