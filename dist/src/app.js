import express from 'express';
import connectDB from './configs/dbConnection';
import indexRoute from './routes/indexRoute';
import { PORT } from './helper/constants';
import logger from './utils/logger';
const app = express();
app.use(express.json());
app.use("/api/v1", indexRoute);
connectDB();
app.listen(PORT, () => {
    logger.info(`🚀 Server is running.. on http://localhost:${PORT}🚀..`);
});