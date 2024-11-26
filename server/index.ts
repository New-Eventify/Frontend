import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './src/docs/swagger.json';
import userRoutes from './src/routes/userRoutes';
import eventRoutes from './src/routes/eventRoutes';
import registrationRoutes from './src/routes/registrationRoutes';
import errorHandler from './src/middlewares/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Set body size limits
app.use(express.json({ limit: '10mb' })); // Increase limit for JSON bodies
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Increase limit for URL-encoded bodies

// Add Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Your routes will go here
app.get("/", (req, res) => {
  res.send("Welcome to the Event Management API!");
});

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);

// Use error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
