import { z } from "zod";

const server = z.object({

HOST_NAME: z.string(),
MOCK_OPENAI: z.string(),
NEXT_PUBLIC_OPENAI_KEY: z.string()

});


const client = z.object({
    // NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
  });


/**
 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
 * middlewares) or client-side so we need to destruct manually.
 *
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */
const processEnv = {
    HOST_NAME: process.env.HOST_NAME,
    MOCK_OPENAI: process.env.MOCK_OPENAI,
    NEXT_PUBLIC_OPENAI_KEY: process.env.NEXT_PUBLIC_OPENAI_KEY

};


const merged = server.merge(client);