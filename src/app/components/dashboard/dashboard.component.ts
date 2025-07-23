import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <h1>User Dashboard</h1>
    <p>Welcome to your dashboard! Only logged-in users can see this page.</p>
  `,
})
export class DashboardComponent {}
