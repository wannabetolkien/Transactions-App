import {z} from 'zod'

const updateZod = z.object({
    password:z.string().optional(),
    firstName:z.string().optional(),
    lastName:z.string().optional()
});

export default updateZod;