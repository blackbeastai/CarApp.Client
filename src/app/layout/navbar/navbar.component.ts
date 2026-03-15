import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

interface MenuItem {
  label: string;
  route: string;
  roles: string[];
}

@Component({
  selector:    'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls:   ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  menuItems: MenuItem[] = [
    { label: 'Car Models',  route: '/car-model',  roles: ['Admin', 'User'] },
    { label: 'Commission',  route: '/commission', roles: ['Admin', 'User'] }
  ];

  visibleItems: MenuItem[] = [];
  username = '';

  constructor(
    private authService: AuthService,
    private router:      Router
  ) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    const role    = this.authService.getRole();
    // Filter menu based on role — dynamic menu
    this.visibleItems = this.menuItems.filter(
      item => item.roles.includes(role)
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}