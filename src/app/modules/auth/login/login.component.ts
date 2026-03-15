import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    isLoading = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private notificationService: NotificationService
    ) { }

    ngOnInit(): void {
        // Redirect if already logged in
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/car-model']);
        }

        // Build the form with validations
        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required,
            Validators.minLength(6)]]
        });
    }

    //Getter for easy access in the template
    get f() { return this.loginForm.controls; }

    onSubmit(): void {
        // Stop if form is invalid
        if (this.loginForm.invalid) return;

        this.isLoading = true;
        this.authService.login(this.loginForm.value).subscribe({
            next: () => {
                this.notificationService.success('Login successful!');
                this.router.navigate(['/car-model']);
            },
            error: (error) => {
                this.isLoading = false;
                this.notificationService.error('Invalid username or password.');
            }
        });
    }
}