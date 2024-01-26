import { Component } from '@angular/core';
import { Web3Handler } from 'src/web3';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Home',
  templateUrl: 'Home.page.html',
  styleUrls: ['Home.page.scss'],
})
export class HomePage {
  constructor(private authService: AuthService, private router: Router) {}

  logoutMetamask() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
