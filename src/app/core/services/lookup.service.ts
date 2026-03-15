import{ Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Brand{
    id: number;
    name: string;
}

export interface carClasses{
    id: number;
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class LookupService {
    private apiUrl = `${environment.apiUrl}/lookup`;
    constructor(private http: HttpClient) {}
    
    getBrands(): Observable<Brand[]>{
        return this.http.get<Brand[]>(`${this.apiUrl}/brands`);
    }

    getCarClasses(): Observable<carClasses[]>{
        return this.http.get<carClasses[]>(`${this.apiUrl}/classes`);
    }
}