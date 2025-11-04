import request from 'supertest';
import { describe, it, vi, expect } from 'vitest';
import app from '../src/app';

describe('Superhero routes', () => {
    it('Should return 200 and an array of superheros', async() => {
        const res = await request(app).get('/superheroes');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
   it('Should return 404 if superhero does not exist', async() => {
       const res = await request(app).get('/superheroes/5000');
       expect(res.status).toBe(404);
   });
});