import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom'


import CreatePoll from '../../components/CreatePoll';

import store from './mock-store';

const navigate = jest.fn()

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('CreatePoll', () => {

    it('should load CreatePoll', () => {
        let component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <CreatePoll />
                </BrowserRouter>
            </Provider>
        );
        expect(component).toMatchSnapshot();
    })

    it('should create new question on submit', () => {
        let component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <CreatePoll />
                </BrowserRouter>
            </Provider>
        );

        let optionOne = component.getByTestId('optionOne'),
        optionTwo = component.getByTestId('optionTwo'),
        submitQuestion = component.getByTestId('submitQuestion');


        fireEvent.change(optionOne, { target: { value: 'React'}});
        fireEvent.change(optionTwo, { target: { value: 'Python'}});
        fireEvent.click(submitQuestion);

        expect(mockedUsedNavigate).toHaveBeenCalledWith('/home');
    })

    it('should enable submit when options are filled', () => {
        let component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <CreatePoll />
                </BrowserRouter>
            </Provider>
        );

        let optionOne = component.getByTestId('optionOne'),
        optionTwo = component.getByTestId('optionTwo'),
        submitQuestion = component.getByTestId('submitQuestion');

        expect(submitQuestion).toBeDisabled();

        fireEvent.change(optionOne, { target: { value: 'React'}});
        fireEvent.change(optionTwo, { target: { value: 'Python'}});

        expect(submitQuestion).not.toBeDisabled();
    })
})