import { routes } from "src/shared/routing";


export const currentRoute = routes.accessHub
currentRoute.opened.watch(() => {
  console.info('Access route opened')
})
