import {
    _getQuestions,
    _getUsers,
    _saveQuestion,
    _saveQuestionAnswer
} from '../../api/_DATA';

let MOCK_QUESTION_IDS = [
    '8xf0y6ziyjabvozdd253nd',
    '6ni6ok3ym7mf1p33lnez',
    'am8ehyc8byjqgar0jgpub9',
    'loxhs1bqm25b708cmbf3g',
    'vthrdm985a262al8qx3do',
    'xj352vofupe1dqz9emx13r'
]

let MOCK_USER_IDS = [
    'sarahedo',
    'tylermcginnis',
    'johndoe'
]

let MOCK_QUESTION = {
    author: 'johndoe',
    optionOne: {
        votes: [],
        text: 'Manual Test'
    },
    optionTwo: {
        votes: [],
        text: 'Jest Test'
    }
}

describe('_DATA', () => {
    it('should get all questions', async () => {
        let questions = await _getQuestions();
        let questionIds = Object.keys(questions);

        expect(questionIds.length).toBe(6);
        expect(questionIds).toEqual(MOCK_QUESTION_IDS)
    });

    it('should get all users', async () => {
        let users = await _getUsers();
        let userIds = Object.keys(users);

        expect(userIds.length).toBe(3);
        expect(userIds).toEqual(MOCK_USER_IDS)
    });

    describe('_saveQuestion', () => {
        it('should save the question with valid input', async () => {
            let question = { 
                optionOneText: 'Manual Test',
                optionTwoText: 'Jest Test',
                author: 'johndoe'
            }

            let res = await _saveQuestion(question);

            expect(res.author).toEqual(MOCK_QUESTION.author);
            expect(res.optionOne).toEqual(MOCK_QUESTION.optionOne);
            expect(res.optionTwo).toEqual(MOCK_QUESTION.optionTwo);
        })

        it('should throw error for invalid input', async () => {
            let wrongQuestion = { 
                optionOneText: 'Manual Test',
                optionTwoText: 'Jest Test',
            }
            await expect(
                _saveQuestion(wrongQuestion)
            ).rejects.toBe('Something went wrong while saving the question');
        })
    })

    describe('_saveQuestionAnswer', () => {
        it('should save the answer with valid input', async () => {
            let answer = {
                authedUser: 'johndoe', qid: 'am8ehyc8byjqgar0jgpub9', answer: 'optionOne'
            }

            let questions = await _saveQuestionAnswer(answer).then(() => _getQuestions())

            expect(questions['am8ehyc8byjqgar0jgpub9'].optionOne.votes.includes('johndoe')).toBe(true)
            
        })

        it('should throw error for invalid input', async () => {
            let wrongAnswer = { 
                'am8ehyc8byjqgar0jgpub9': 'optionOne'
            }
            await expect(
                _saveQuestionAnswer(wrongAnswer)
            ).rejects.toBe('Something went wrong while saving the answer');
        })
    })
})