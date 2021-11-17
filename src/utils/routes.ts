/**
 * All defined routes for the application.
 */
const routes = {
  home: '/app/home',
  cart: '/app/cart',
  login: '/app/login',
  admin: '/app/admin',
  adminOngoing: '/app/admin/ongoing',
  adminHistory: '/app/admin/history',
  adminMenu: '/app/admin/menu-management',
} as const;

export default routes;
