import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarModel, CarModelService } from '../car-model.service';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotificationService } from '../../../core/services/notification.service';
import { environment } from '../../../../environments/environment';

@Component(
    {
        selector: 'app-car-model-list',
        templateUrl: './car-model-list.component.html',
        styleUrls: ['./car-model-list.component.scss']
    })

export class CarModelListComponent implements OnInit {
    carModels: CarModel[] = [];
    isLoading = false;
    searchName = '';
    searchCode = '';
    apiBase = environment.apiUrl.replace('/api', '');

    constructor(
        private carModelService: CarModelService,
        private notificationService: NotificationService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadCarModels();
    }
    loadCarModels(): void {
        this.isLoading = true;
        this.carModelService.getAll(
            this.searchName,
            this.searchCode
        ).subscribe({
            next: data => {
                this.carModels = data;
                this.isLoading = false;
            },
            error: () => {
                this.isLoading = false;
            }
        });
    }
    onSearch(): void {
        this.loadCarModels();
    }

    onClear(): void {
        this.searchName = '';
        this.searchCode = '';
        this.loadCarModels();
    }

    onAdd(): void {
        this.router.navigate(['/car-model/add']);
    }

    onEdit(id: number): void {
        this.router.navigate(['/car-model/edit', id]);
    }

    onDelete(id: number): void {
        if (!confirm('Are you sure you want to delete this car model?'))
            return;

        this.carModelService.delete(id).subscribe({
            next: () => {
                this.notificationService.success('Car model deleted successfully!');
                this.loadCarModels();
            }
        });
    }

    getImageUrl(path: string): string {
        if (!path) 
            return 'http://placehold.co/400x300?text=No+Image';
        return `${this.apiBase}/${path}`;
    }
}