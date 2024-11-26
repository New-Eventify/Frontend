import redisClient from './redisClient';

export const blacklistToken = async (token: string, expiresIn: number): Promise<void> => {
    // Store the token with TTL (matching token expiration)
    await redisClient.set(`blacklist:${token}`, 'true', {
        EX: expiresIn // TTL in seconds
    });
};
