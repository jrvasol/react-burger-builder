import React from 'react';
import styles from './Input.module.css';

const Input = ({name, register, label, elementType, elementConfig, errors}) => {
    let inputElement = null;
    const inputClasses = [styles['InputElement']];

    if(errors[name]) {
        inputClasses.push(styles['invalid']);
    }

    switch (elementType) {
        case('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                ref={register}
                name={name}
                {...elementConfig}/>;
            break;
        case('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...elementConfig}/>;
            break;
        case('select'):
            inputElement = <select className={inputClasses.join(' ')} defaultValue="cheapest" ref={register} name={name}>
                {elementConfig 
                    .options
                    .map((option) => (
                        <option value={option.value} key={option.value}>{option.displayName}</option>
                    ))
                }
            </select>;
            break;
        default:
            inputElement = <input
                name={name}
                ref={register}
                className={inputClasses.join(' ')}
                {...elementConfig}/>;

    }

    return (
        <div className={styles['Input']}>
            { label ? <label className={styles['Label']}>{label}</label> : null}
            {inputElement}
            <div className={styles['error-container']}>
                {errors[name] && <p className={styles['error-message']}>{errors[name].message}</p>}
            </div>
        </div>
    )
}

export default Input;