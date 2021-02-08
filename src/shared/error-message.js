export const errorMessage = (code) => { 
    let message;

    switch(code) {
        case 'INVALID_EMAIL':
            message = 'Invalid Email';
            break;
        default:
            message = code;
    }

    return message;
};