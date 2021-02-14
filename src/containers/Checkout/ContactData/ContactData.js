import React, {useState} from 'react';
import {connect} from 'react-redux';
import {useForm} from 'react-hook-form';

import {purchaseBurger} from '../../../store/actions/order';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../axios-orders';

import styles from './ContactData.module.css';

const ContactData = (props) => {
    const {useState} = React;
    const {register, handleSubmit, errors} = useForm({mode: "onChange"});

    const [controls] = useState({
        name: {
            label: 'Name',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            rules: {
                required: "This is a required field"
            }
        },
        street: {
            label: 'Street',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Street Name'
            },
            rules: {
                required: "This is a required field"
            }
        },
        zipCode: {
            label: 'Zip Code',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your zip code'
            },
            rules: {
                required: "This is a required field",
                minLength: {
                    value: 5,
                    message: "Please input correct zip code"
                },
                maxLength: {
                    value: 5,
                    message: "Please input correct zip code"
                }
            }
        },
        email: {
            label: 'E-mail Address',
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your email address'
            },
            rules: {
                required: "This is a required field",
                pattern: {
                    value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                    message: "Invalid email address"
                }
            }
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
            value: 'cheapest'
        }
    });

    const onSubmit = (data) => {
        const formData = {
            name: data.name,
            street: data.street,
            zipCode: data.zipCode,
            email: data.email,
            deliveryMethod: data.deliveryMethod
        }

        const order = {
            ingredients: props.activeIngredients,
            price: props.totalPrice,
            customerData: formData,
            userId: props.userId
        }

        props.purchaseBurger(order, props.token);
    }

    const formElement = [];
    for (const [key,
        value]of Object.entries(controls)) {
        formElement.push({id: key, config: value});
    } 

    const form = formElement.map(({id, config}) => (<Input
        key={id}
        name={id}
        errors={errors}
        register={register({ ...config.rules })}
        label={config.label}
        elementConfig={config.elementConfig}
        elementType={config.elementType}
        value={config.value}/>));

    return (
        <div className={styles['contact-container']}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {form}
                {props.isLoading
                    ? <Spinner/>
                    : <Button classes="block">Order</Button>}
            </form>
        </div>
    )
};

const mapStateToProps = ({burgerBuilder, order, auth}) => ({token: auth.token, activeIngredients: burgerBuilder.activeIngredients, isLoading: order.loading, totalPrice: burgerBuilder.totalPrice, userId: auth.userId});

const mapDispatchToProps = dispatch => {
    return {
        purchaseBurger: (orderData, token) => dispatch(purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));