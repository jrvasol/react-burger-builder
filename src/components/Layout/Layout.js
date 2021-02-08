import React, {useState} from 'react';
import Aux from '../../hoc/Auxiliary';
import Modal from 'react-modal';
import styles from './Layout.module.css';
import '../../assets/css/SideDrawer.css';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
    const [sideDrawerIsOpen,
        setSideDrawerOpen] = useState(false);

    const openSideDrawer = () => {
        setSideDrawerOpen(true);
    }

    const closeSideDrawer = () => {
        setSideDrawerOpen(false);
    }

    Modal.setAppElement('body');

    return (
        <Aux>
            <div>
                <Toolbar openMenu={openSideDrawer}></Toolbar>
            </div>

            <main className={styles['main-content']}>
                {props.children}
            </main>

            <Modal
                className="side-drawer"
                overlayClassName="side-drawer-overlay"
                isOpen={sideDrawerIsOpen}
                closeTimeoutMS={100}
                onRequestClose={closeSideDrawer}>
                <SideDrawer></SideDrawer>
            </Modal>
        </Aux>
    )
}

export default Layout;