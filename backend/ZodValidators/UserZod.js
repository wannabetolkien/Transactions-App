import {z} from 'zod';

const userZod = z.object({
  username:z.string().email(),
  password:z.string(),
  firstname:z.string(),
  lastname:z.string()
});


export default userZod;