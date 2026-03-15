import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    username: string;
    role: string;
}

interface JwtPayload {
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string;
    exp: number;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = `${environment.apiUrl}/auth`;

    constructor(private http: HttpClient) { }

    login(credentials: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(
            `${this.apiUrl}/login`, credentials
        ).pipe(
            // Store the token in localStorage
            tap(response => {
                localStorage.setItem('token', response.token);
                localStorage.setItem('username', response.username);
                localStorage.setItem('role', response.role);
            })
        );
    }

    logout(): void {
        localStorage.clear();
    }

    isLoggedIn(): boolean {
        const token = localStorage.getItem('token');
        if (!token) return false;

        try {
            const decoded = jwtDecode<JwtPayload>(token);
            const isExpired = decoded.exp * 1000 < Date.now();
            if (!isExpired) {
                localStorage.clear();
                return false;
            }
            return true;
        } catch (error) {

            return false;
        }
    }

    getRole(): string {
        return localStorage.getItem('role') ?? '';
    }

    getUsername(): string {
        return localStorage.getItem('username') ?? '';
    }
}