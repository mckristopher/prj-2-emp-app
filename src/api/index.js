import {
    _getQuestions,
    _getUsers,
    _saveQuestion
} from './_DATA';

export function getInitialData() {
    return Promise.all([
        _getQuestions(),
        _getUsers()
    ]).then(([ questions, users]) => ({
        questions,
        users
    }));
}

export function createPoll(question) {
    return _saveQuestion(question)
}