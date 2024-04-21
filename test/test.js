import { expect } from 'chai';

import {getCardsController, submitFormController} from './../controllers/controller';
import { getCards, submitForm } from './../models/cat';


describe('Controller Tests', () => {
    describe('getCardsController', () => {
        it('should return a list of cards', async () => {
            const req = {};
            const res = {
                json: (data) => {
                    expect(data.statusCode).to.equal(200);
                    expect(data.cards).to.be.an('array');
                    expect(data.message).to.equal('Success');
                }
            };

            const mockCardList = [{ id: 1, title: 'Card 1' }, { id: 2, title: 'Card 2' }];
            getCards.getCards = () => Promise.resolve(mockCardList);

            await getCardsController(req, res);
        });

        it('should handle errors properly', async () => {
            const req = {};
            const res = {
                status: (status) => {
                    expect(status).to.equal(500);
                    return res;
                },
                json: (data) => {
                    expect(data.statusCode).to.equal(500);
                    expect(data.message).to.be.a('string');
                }
            };

            getCards.getCards = () => Promise.reject(new Error('Database Error'));

            await getCardsController(req, res);
        });
    });

    describe('submitFormController', () => {
        it('should submit form data', async () => {
            const req = {
                body: {
                    title: 'Test Title',
                    image: 'test.jpg',
                    description: 'Test Description'
                }
            };
            const res = {
                json: (data) => {
                    expect(data.success).to.be.true;
                }
            };

            submitForm.submitForm = () => Promise.resolve({ success: true });

            await submitFormController(req, res);
        });

        it('should handle errors properly', async () => {
            const req = {
                body: {
                    title: 'Test Title',
                    image: 'test.jpg',
                    description: 'Test Description'
                }
            };
            const res = {
                status: (status) => {
                    expect(status).to.equal(500);
                    return res;
                },
                json: (data) => {
                    expect(data.statusCode).to.equal(500);
                    expect(data.message).to.be.a('string');
                }
            };

            submitForm.submitForm = () => Promise.reject(new Error('Submission Error'));

            await submitFormController(req, res);
        });
    });
});
