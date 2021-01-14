import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

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
        },
        isSignup: true
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
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup}
        })
    }

    render() {
        const formElement = [];
        for (const [key,
            value]of Object.entries(this.state.controls)) {
            formElement.push({id: key, config: value});
        }

        const form = formElement.map(({id, config}) => (<Input
            name={id}
            key={id}
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
            <div>
                { this.props.isAuthenticated ? <Redirect to={this.props.authRedirectPath} /> : null }

                <form onSubmit={this.submitHandler}>
                    {form}
                    {errorMessage}
                    {
                        this.props.loading ? <Spinner/> : <Button btnType="Success">Submit</Button>
                    }
                </form>

                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>Switch to {this.state.isSignup ? 'Signin' : 'Signup'}</Button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) => dispatch(auth(email, password, isSignup)),
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