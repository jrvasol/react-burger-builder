import React from 'react';
import {connect} from 'react-redux';
import {Redirect, NavLink} from 'react-router-dom';
import {useForm} from 'react-hook-form';

import styles from '../Auth.module.css';
import {auth, setAuthRedirectPath, authFail} from '../../../store/actions/auth';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

export const Signup = (props) => {
    const {useState, useRef, useEffect} = React;
    const {register, handleSubmit, errors, watch, formState} = useForm({mode: "onChange"});
    const {isValid} = formState;

    useEffect(() => {
        props.onAuthFail();
    }, []);

    const password = useRef({});
    password.current = watch("password", "");

    // input rules should be based on react-hook-form
    const [controls] = useState({
        email: {
            label: 'Email',
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email'
            },
            rules: {
                required: "This is a required field",
                pattern: {
                    value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                    message: "Invalid email address"
                }
            }
        },
        password: {
            label: 'Password',
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            rules: {
                required: "This is a required field",
                minLength: {
                    value: 6,
                    message: "Password should be atleast 6 characters"
                }
            }
        },
        repeatPassword: {
            label: 'Repeat Password',
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            rules: {
                required: "This is a required field",
                minLength: {
                    value: 6,
                    message: "Password should be atleast 6 characters"
                },
                validate: val => val === password.current || "The passwords does not match"
            },
            value: ''
        }
    });

    const formElement = [];
    for (const [key,
        value]of Object.entries(controls)) {
        formElement.push({id: key, config: value});
    }

    const form = formElement.map(({id, config}) => (<Input
        key={id}
        name={id}
        errors={errors}
        register={register({
        ...config.rules
    })}
        label={config.label}
        elementConfig={config.elementConfig}
        elementType={config.elementType}
        value={config.value}/>));

    const onSubmit = (data) => {
        props.onAuth(data.email, data.password, true);
    }

    let errorMessage = null;
    if (props.error) {
        errorMessage = (
            <div className={styles['error-message']}>
                <p>
                    {props.error.message}
                </p>
            </div>
        );
    }

    return (
        <div className={styles['login-container']}>
            {props.isAuthenticated
                ? <Redirect to={props.authRedirectPath}/>
                : null}

            <h1 className={styles['header']}>Sign up</h1>

            {errorMessage}

            <form onSubmit={handleSubmit(onSubmit)}>
                {form}
                <div className={styles['form-btn-container']}>
                    <Button classes="block" disabled={!isValid}>{props.loading
                            ? <Spinner/>
                            : 'Sign up'}</Button>
                </div>
            </form>

            <div className={styles['switch-container']}>
                <p className={styles['switch-text']}>Don't have an account?</p>
                <NavLink to="signin">Sign in</NavLink>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) => dispatch(auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/')),
        onAuthFail: () => dispatch(authFail(null))
    }
};

const mapStateToProps = ({auth, burgerBuilder}) => ({
    loading: auth.loading,
    error: auth.error,
    isAuthenticated: auth.token !== null,
    building: burgerBuilder.building,
    authRedirectPath: auth.authRedirectPath
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup);