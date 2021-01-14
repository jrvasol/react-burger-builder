import React from 'react';
import styles from './Input.module.css';

const Input = (props) => {
    let inputElement = null;
    const inputClasses = [styles['InputElement']];


    if(props.isInvalid && props.shouldValidate && props.touched) {
        inputClasses.push(styles['invalid']);
    }

    switch (props.elementType) {
        case('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                value={props.value}
                name={props.name}
                {...props.elementConfig}
                onChange={props.handleValueChange}/>;
            break;
        case('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                value={props.value}
                {...props.elementConfig}/>;
            break;
        case('select'):
            inputElement = <select className={inputClasses.join(' ')} onChange={props.handleValueChange} defaultValue="cheapest">
                {props
                    .elementConfig 
                    .options
                    .map((option) => (
                        <option value={option.value} key={option.value}>{option.displayName}</option>
                    ))
                }
            </select>;
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                value={props.value}
                {...props.elementConfig}
                onChange={props.handleValueChange}/>;

    }

    return (
        <div className={styles['Input']}>
            <label className={styles['Label']}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default Input;