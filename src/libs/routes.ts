export const publicRoutes = ['/'];

export const authRoutes = ['/signup', '/signin', '/email-verification', '/password-reset'];

export const apiAuthPrefix = '/api/auth';

export const authApiRoutes = ['/api/folders', '/api/documents', '/api/user', '/api/token'];

export const DEFAULT_LOGIN_REDIRECT = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
