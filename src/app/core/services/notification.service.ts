import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})

export class NotificationService {

    constructor(private toastr: ToastrService) { }

    success(message: string): void {
        this.toastr.success(message, 'Success');
    }

    error(message: string): void {
        this.toastr.error(message, 'Error');
    }

    warning(message: string): void {
        this.toastr.warning(message, 'Warning');
    }

    info(message: string): void {
        this.toastr.info(message, 'Info');
    }
}
