import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import store from '../../../store/store';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

describe("<NavigationItems/>", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems store={store}/>);
    });

    it('should render two <NavigationItem/> if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(0);
    });

    it('should render three <NavigationItem/> if authenticated', () => {
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(0);
    });
});