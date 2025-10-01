/**
 * Application route paths
 * Centralized route definitions to avoid hardcoding paths throughout the app
 */

export const ROUTES = {
  HOME: '/',
  SIGNIN: '/signin',
  THEME_VIEWER: '/theme-viewer',
} as const;

// Type-safe route keys
export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];

