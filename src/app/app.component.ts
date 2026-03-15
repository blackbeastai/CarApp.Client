import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector:    'app-root',
  templateUrl: './app.component.html',
  styleUrls:   ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showNavbar = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Hide navbar on login page
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !event.url.includes('/auth');
      }
    });
  }
}