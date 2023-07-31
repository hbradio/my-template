import type { PageServerLoad, User, Actions } from "./$types";
import prisma from '$lib/prisma';

export const load: PageServerLoad = async ({ parent }) => {
  const data = await parent()
  const user = data.user;

  const response = await prisma.post.findMany({
    where: {
      published: true, 
      author: {
        is: {
          email: user.email,
        }
      }
    },
    include: { author: true }
  })

  return { feed: response, user: user };
};