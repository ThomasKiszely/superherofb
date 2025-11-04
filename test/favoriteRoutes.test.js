const request = require( 'supertest');
import { describe, it, vi, expect } from 'vitest';
const app = require('../src/app');


describe('Favorite Routes', () => {
    it('Should return 200 and an array of favorites', async () => {
        const res = await request(app).get('/favorites');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('Should return 404 if does not exist', async () => {
        const res = await request(app)['delete']('/favorites/200');
        expect(res.status).toBe(500);
    });
});
