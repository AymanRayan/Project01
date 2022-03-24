import { Application } from 'express';
import express from 'express';
import imgs from './routes/imgRoutes';
const app: Application = express();
const PORT = 3000;

app.use(imgs);

app.listen(PORT, async (): Promise<void> => {
  console.log(`The Server at http://localhost:${PORT}`);
});

export default app;
