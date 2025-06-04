import {z} from 'zod';

const userZod = z.object({
  username:z.string().trim().min(3).max(30).email().transform(value=>value.toLowerCase()),
  password:z.string().trim().max(200),
  firstName:z.string().trim().max(50),
  lastName:z.string().trim().max(50)
});


export default userZod;