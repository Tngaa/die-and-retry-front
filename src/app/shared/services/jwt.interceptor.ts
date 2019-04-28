import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    /**
     * Intercepter toutes les requêtes sortantes et ajouter le toker Bearer dans le header
     * @param request 
     * @param next 
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = this.authenticationService.currentUserValue;

        // Ajouter le token dans le header si il existe
        // (Ici on clone la requête car on ne peut pas modifier une requête en cours)
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request).pipe(
            catchError((httpError: HttpErrorResponse) => {
                console.log(httpError);

                if (httpError.status === 401 || httpError.status === 403) {
                    this.authenticationService.logout();
                }
                // On arrete le chargement si la reqûete est en erreur
                return throwError(httpError);
            })
        );
    }
}