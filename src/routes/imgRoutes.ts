import { Router, Request, Response } from 'express';
import {
  findImg,
  validateQueryData,
  createNewImg,
  isAvilable,
} from './api/Resizing';

const imgs: Router = Router();

imgs.get('/images', async (req: Request, res: Response) => {
  const message: string | boolean = await validateQueryData(req.query);
  if (message) {
    res.send({
      status:400,
      message:message});
  }
  const isAccepted = await isAvilable(req.query);
  if (isAccepted) {
    await createNewImg(req.query);
    const location = await findImg(req.query);
    if (location) {
      res.sendFile(location);
    } else {
      res.send({
        status:500,
        message:'There is an error in Retriving data'});
    }
  } else {
    res.send({
     status:404,
     message:"There is no file for this name pick one from IMAGES folder or put your img there then use the name without it's extention ... Try again"
  });
  }
});

export default imgs;
