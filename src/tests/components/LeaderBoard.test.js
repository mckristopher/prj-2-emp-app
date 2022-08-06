import { render } from '@testing-library/react';

import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import LeaderBoard from '../../components/LeaderBoard';

import store from './mock-store';

describe('LeaderBoard', () => {
    it('should match snapshot', () => {

        let component = render (
            <Provider store={store}>
                <BrowserRouter>
                    <LeaderBoard />
                </BrowserRouter>
            </Provider>
        )
        expect(component).toMatchSnapshot();
    })


});