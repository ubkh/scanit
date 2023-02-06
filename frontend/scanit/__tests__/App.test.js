import React from 'react';
import TestRenderer from 'react-test-renderer';

import App from '../src/App';

//const tree = TestRenderer.create(<App />).toJSON();

describe('<App />', () => {
    it('has 1 child', () => {
        //expect(tree.children.length).toBe(1);
    });

    it('renders correctly', () => {
        //expect(tree).toMatchSnapshot();
    });
});