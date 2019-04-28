import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    /**
     * Récuperer l'utilisateur courant
     */
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    /**
     * Se connecter à l'application.
     * En retour, le serveur renvoie un token.
     * On récupère ce token et on le met dans localstorage.
     * Puis pour chaque requête sortante on le met dans le header
     */
    public login(user: User) {
        return this.http.post<any>('/api/users/login', user)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    /**
     * Se déconnecter de l'application.
     * Dans ce cas, il suffit juste de supprimer le token
     */
    public logout(): void {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }
}