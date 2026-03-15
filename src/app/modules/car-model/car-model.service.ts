import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface CarModel {
  id:                  number;
  brandId:             number;
  brandName:           string;
  classId:             number;
  className:           string;
  modelName:           string;
  modelCode:           string;
  description:         string;
  features:            string;
  price:               number;
  dateOfManufacturing: string;
  isActive:            boolean;
  sortOrder:           number;
  defaultImagePath:    string;
  images:              CarModelImage[];
}

export interface CarModelImage {
  id:        number;
  fileName:  string;
  filePath:  string;
  isDefault: boolean;
}

export interface CreateCarModel {
  brandId:             number;
  classId:             number;
  modelName:           string;
  modelCode:           string;
  description:         string;
  features:            string;
  price:               number;
  dateOfManufacturing: string;
  isActive:            boolean;
  sortOrder:           number;
}

@Injectable({
  providedIn: 'root'
})
export class CarModelService {

  private apiUrl = `${environment.apiUrl}/carmodel`;

  constructor(private http: HttpClient) {}

  getAll(searchName?: string, searchCode?: string): Observable<CarModel[]> {
    let params = new HttpParams();
    if (searchName) params = params.set('searchName', searchName);
    if (searchCode) params = params.set('searchCode', searchCode);
    return this.http.get<CarModel[]>(this.apiUrl, { params });
  }

  getById(id: number): Observable<CarModel> {
    return this.http.get<CarModel>(`${this.apiUrl}/${id}`);
  }

  create(dto: CreateCarModel): Observable<any> {
    return this.http.post(this.apiUrl, dto);
  }

  update(id: number, dto: CreateCarModel): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  uploadImages(id: number, files: File[]): Observable<any> {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    return this.http.post(`${this.apiUrl}/${id}/images`, formData);
  }
}