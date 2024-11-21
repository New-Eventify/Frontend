import { createClient } from 'redis';

const redisClient = createClient({
    password: "NVVBAaJXuhHLc4347j96ws4bX6HNOraj",
    socket: {
        host: "redis-11828.c62.us-east-1-4.ec2.redns.redis-cloud.com",
        port: 11828
    }
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error', err);
});

(async () => {
    try {
        await redisClient.connect();
        console.log('Connected to Redis Cloud successfully!');
    } catch (err) {
        console.error('Failed to connect to Redis Cloud', err);
    }
})();

export default redisClient;
