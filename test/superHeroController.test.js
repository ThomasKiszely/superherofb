import {describe, it, expect, vi} from "vitest";
import axios from 'axios';

describe('Live API test', () => {
    it('Should fetch real heroes from API', async () => {
        const response = await axios.get('https://akabab.github.io/superhero-api/api/all.json');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBe(true);
        expect(response.data.length).toBeGreaterThan(0);
        expect(response.data[0]).toHaveProperty('name');
    });
});
