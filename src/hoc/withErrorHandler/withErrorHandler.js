import React, { Component } from 'react';

import Modal from 'react-modal';
import Aux from '../Aux';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                error: null,
                showModal: false
            }
        }

        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use( req => {
                this.setState( { error: null, showModal: false } );
                return req;
            } );
            this.resInterceptor = axios.interceptors.response.use( res => res, error => {
                this.setState( { error: error, showModal: true } );
            } );
        }

        componentWillUnmount () {
            axios.interceptors.request.eject( this.reqInterceptor );
            axios.interceptors.response.eject( this.resInterceptor );
        }

        closeModal = () => {
            this.setState( { showModal: false } );
        }

        render () {
            return (
                <Aux>
                    <Modal
                        isOpen={this.state.showModal}
                        onRequestClose={this.closeModal}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;

// import React, { useEffect, useState } from 'react';
// import Modal from 'react-modal';

// import Aux from '../Aux';

// const withErrorHandler = (WrappedComponent, axios) => {
//     return (props) => {
//         const [showModal, setShowModal] = useState(false);
//         const [errorMessage, setErrorMessage] = useState(null);

//         const closeModal = () => {
//             setShowModal(false);
//         }

//         useEffect(() => {
//             const reqInterceptor = axios.interceptors.request.use(req => {
//                 setErrorMessage(null);
//                 setShowModal(false);
//                 return req;
//             });

//             const resInterceptor = axios.interceptors.response.use(res => res, error => {
//                 console.log('error: ' + error);
//                 setErrorMessage(error.message);
//                 setShowModal(true);
//             });

//             return () => {
//                 axios.interceptors.request.eject(reqInterceptor);
//                 axios.interceptors.response.eject(resInterceptor); 
//             }
//         }, [])
        
//         return (
//             <Aux>
//                 <Modal 
//                     isOpen={showModal} 
//                     onRequestClose={closeModal}>
//                         {errorMessage}
//                 </Modal>
//                 <WrappedComponent {...props}/>
//             </Aux>
//         )
//     }
// }

// export default withErrorHandler;
