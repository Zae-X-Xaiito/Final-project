import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
            if ([401, 403].includes(err.status)) {
                this.router.navigate(['/login']);
            }

            const error = (err.error && err.error.message) ? err.error.message : (err.statusText || 'Unknown Server Error');
            console.error('HTTP Error Interceptor:', error);
            return throwError(() => new Error(error));
        }))
    }
}
