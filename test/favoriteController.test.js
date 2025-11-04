import { describe, it, expect, vi, beforeEach } from 'vitest';
const favoriteController = require('../src/controllers/favoriteController');
const favoriteService = require('../src/services/favoriteService');

describe('favoriteController', () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {} };
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };
        next = vi.fn();
    });

    it('should return all favorites', async () => {
        const mockFavorites = [{ id: 1, note: 'Cool hero' }];
        vi.spyOn(favoriteService, 'getAllFavorites').mockResolvedValue(mockFavorites);

        await favoriteController.getFavorites(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockFavorites);
    });

    it('should create a favorite', async () => {
        req.body = { id: 2, note: 'Legendary' };
        const mockFavorite = { id: 2, note: 'Legendary' };
        vi.spyOn(favoriteService, 'addFavorite').mockResolvedValue(mockFavorite);

        await favoriteController.createFavoriteController(req, res, next);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockFavorite);
    });

    it('should delete a favorite', async () => {
        const req = {
            params: {
                id: 3
            }
        };

        const mockDeleted = { id: 3, note: 'Deleted' };
        vi.spyOn(favoriteService, 'deleteFavorite').mockResolvedValue(mockDeleted);

        await favoriteController.deleteFavoriteController(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockDeleted);
    });
});
