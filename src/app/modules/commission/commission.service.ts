import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface CommissionLine {
  brandName:       string;
  className:       string;
  unitsSold:       number;
  modelPrice:      number;
  fixedCommission: number;
  classCommission: number;
  lineTotal:       number;
}

export interface CommissionReport {
  salesmanName:     string;
  totalSalesAmount: number;
  fixedCommission:  number;
  classCommission:  number;
  bonusCommission:  number;
  totalCommission:  number;
  lines:            CommissionLine[];
}

@Injectable({ providedIn: 'root' })
export class CommissionService {
  private apiUrl = `${environment.apiUrl}/commission`;
  constructor(private http: HttpClient) {}
  getReport(): Observable<CommissionReport[]> {
    return this.http.get<CommissionReport[]>(`${this.apiUrl}/report`);
  }
}