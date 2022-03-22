import supertest from 'supertest';
import app from '../index';
import { createNewImg } from '../routes/api/Resizing';
const req = supertest(app);

describe('test the endpoint',()=> {
    it('using endpoint without name or width or height parameter return 400', async () => {
         await req.get('/images').expect(400);
    });
});

describe('test resizing function',()=>{
    it('invalid height value', async ()=>{
       const err= await createNewImg({
            name:'x',
            width:'100',
            height:'-100'
        });expect(err).toBeNull();
    });
});
