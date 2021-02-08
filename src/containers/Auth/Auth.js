import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import styles from './Auth.module.css';

import { auth, setAuthRedirectPath } from '../../store/actions/auth';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import {checkValidity} from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
            email: {
                label: 'Name',
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                label: 'Password',
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        }
    }

    componentDidMount() {
        if(!this.props.building && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (event, id) => {
        const val = event.target.value;
        const inputs = this.state.controls; 

        const updatedControls = {
            ...inputs,
            [id]: {
                ...inputs[id],
                value: val,
                valid: checkValidity(val, inputs[id].validation),
                touched: true
            }
        };
 
        this.setState({
            controls: updatedControls
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
    }

    // switchAuthModeHandler = () => {
    //     this.setState(prevState => {
    //         return {isSignup: !prevState.isSignup}
    //     })
    // }

    render() {
        const formElement = [];
        for (const [key,
            value]of Object.entries(this.state.controls)) {
            formElement.push({id: key, config: value});
        }

        const form = formElement.map(({id, config}) => (<Input
            name={id}
            key={id}
            label={config.label}
            elementConfig={config.elementConfig}
            isInvalid={!config.valid}
            shouldValidate={config.validation}
            touched={config.touched}
            elementType={config.elementType}
            handleValueChange={(event) => {
            this.inputChangedHandler(event, id)
            }}
            value={config.value}/>))

        let errorMessage = null;
        if(this.props.error) {
            errorMessage = (<p>
                {this.props.error.message}
            </p>)
        }

        return (
            <div className={styles['login-container']}>
                { this.props.isAuthenticated ? <Redirect to={this.props.authRedirectPath} /> : null }
                <h1 className={styles['header']}>Sign in</h1>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <div className={styles['error-message']}>{errorMessage}</div>
                    <div className={styles['form-btn-container']}>
                        { this.props.loading ? <Spinner/> : <Button classes="block">Sign in</Button> }
                    </div>
                </form>

                <Button btnType="plain" classes="block" clicked={this.switchAuthModeHandler}>Don't have an account? Switch to sign up</Button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password) => dispatch(auth(email, password)),
        onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/'))
    }
};

const mapStateToProps = ({auth, burgerBuilder}) => ({
    loading: auth.loading,
    error: auth.error,
    isAuthenticated: auth.token !== null,
    building: burgerBuilder.building,
    authRedirectPath: auth.authRedirectPath
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth);