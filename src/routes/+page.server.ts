import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, User, Actions } from "./$types";
import prisma from '$lib/prisma';

export const load: PageServerLoad = async (event) => {
  const session = await event.locals.getSession();
  if (!session?.user) throw redirect(303, "/auth/signin");

  const user: User = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (user == null) {
    const createUserResponse = await prisma.user.create({
      data: {
        email: session.user.email,
        credits: 5
      }
    })
  }

  const response = await prisma.post.findMany({
    where: {
      published: true, 
      author: {
        is: {
          email: session.user.email,
        }
      }
    },
    include: { author: true }
  })

  return { feed: response, user: user };
};