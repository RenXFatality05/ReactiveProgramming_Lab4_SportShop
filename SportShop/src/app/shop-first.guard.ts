import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

export const shopFirstGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (router.lastSuccessfulNavigation() === null) {
    return router.createUrlTree(['/shop']);
  }

  return true;
};
