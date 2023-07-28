import type { LayoutServerLoad } from "./$types"

export const prerender = false;

export const load: LayoutServerLoad = async (event) => {
  return {
    session: await event.locals.getSession(),
  }
}
