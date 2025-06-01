import {z} from 'zod';

const SignInZod = z.object({
    username:z.string().email(),
    password:z.string()
})

export default SignInZod;