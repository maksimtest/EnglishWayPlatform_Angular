import { HttpInterceptorFn } from '@angular/common/http';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('jwtToken'); // Достаём токен

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) // Добавляем токен в заголовки
    : req;

  return next(authReq);
};
