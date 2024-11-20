import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './src/docs/swagger.json';
import userRoutes from './src/routes/userRoutes';
import eventRoutes from './src/routes/eventRoutes';
import errorHandler from './src/middlewares/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

// Add Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs)); // Use the swagger.json file

// Your routes will go here
app.get("/", (req, res) => {
  res.send("Welcome to the Event Management API!");
});

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);

// Use error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
