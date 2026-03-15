import { Component, OnInit } from '@angular/core';
import { CommissionReport, CommissionService } from '../commission.service';

@Component({
  selector:    'app-commission-report',
  templateUrl: './commission-report.component.html',
  styleUrls:   ['./commission-report.component.scss']
})
export class CommissionReportComponent implements OnInit {

  reports:   CommissionReport[] = [];
  isLoading = false;
  selected:  CommissionReport | null = null;

  constructor(private commissionService: CommissionService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.commissionService.getReport().subscribe({
      next: data => {
        this.reports   = data;
        this.isLoading = false;
        if (data.length > 0) this.selected = data[0];
      },
      error: () => this.isLoading = false
    });
  }

  selectSalesman(report: CommissionReport): void {
    this.selected = report;
  }
}