import express from 'express';
import router from './API-router';

/**
 * Express application.
 */
const app = express();

app.use(express.json());

// Since API is not compatible with v1, API version is increased to v2
app.use('/api/v2', router); // Endre navn etterhvert?

export default app;
