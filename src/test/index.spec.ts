import supertest from 'supertest';
import app from '../index';
import { createNewImg } from '../routes/api/Resizing';


describe('test the endpoint', ():void => {
  it('using endpoint that doesn\'t exists return 404', async () => {
      const req = supertest(app);
      const res = await req.get('/');
      expect(res.status).toBe(404);
   
  });
  it('using endpoint that doesn\'t contains name , width , height ', async ()=> {
    const req = supertest(app);
    const res = await req.get('/images/?name=xxx&width=1&height=1');
    expect(res.status).toBe(200);
    
});
});

describe('test resizing function', () => {
  it('invalid height value', async () => {
    const err = await createNewImg({
      name: 'x',
      width: '100',
      height: '-100',
    });
    expect(err).not.toBeNull();
  });
});
