import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private notificationService: NotificationService
    ) { }

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                switch (error.status) {
                    case 401:
                        localStorage.clear();
                        this.router.navigate(['/auth/login']);
                        this.notificationService.error('Session expired. Please login again.');
                        break;
                    case 403:
                        this.notificationService.error('You do not have permission to perform this action.');
                        break;
                    case 404:
                        this.notificationService.error('Resource not found.');
                        break;
                    case 500:
                        this.notificationService.error('Server error. Please try again later.');
                        break;
                    default:
                        this.notificationService.error('Something went wrong.');
                        break;
                }
                return throwError(() => error);
            })
        );
    }
}