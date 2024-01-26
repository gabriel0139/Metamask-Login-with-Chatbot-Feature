import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ResetPasswordPage } from '../reset-password/reset-password.page';
import { Web3Handler } from 'src/web3';
import { DeployContract } from 'src/web3/dev/Deployer';
import { Y28_CONTRACT_ABI } from 'src/web3/abi';
import { retry } from 'rxjs';
import { Web3Error } from 'src/web3/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  loginError: string = '';
  errorPresent: boolean = false;
  isUser = false;
  isAdmin = false;

  constructor(
    private authService: AuthService,
    private modalController: ModalController,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  login() {
    // TODO: Based on user role go to different page
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .then((user) => {
        if (this.loginForm.value.email == 'ecothreads@nyp.sg') {
          this.router.navigate(['/tabs/Home']); // Move navigation here
        } else {
          this.router.navigate(['/tabs/Home']); // Move navigation here
        }
      })
      .catch((error) => {
        this.loginError = 'Username or password is wrong';
        this.errorPresent = true;
      });
  }

  register() {
    this.router.navigateByUrl('register');
  }

  async forgotPassword() {
    const modal = await this.modalController.create({
      component: ResetPasswordPage,
      cssClass: 'modal-content',
    });
    return await modal.present();
  }

  get isDarkMode(): boolean {
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  }

  async loginMetamask() {
    const [userCredential, walletResult] =
      await this.authService.authenticateMetamask();
    console.log([userCredential, walletResult])
    if (userCredential.user && walletResult.success) {
      this.router.navigateByUrl('/tabs/Home');
  
      // Register
    } else {
      console.log([userCredential, walletResult.error]);
    }
  }

  logoutMetamask() {
    Web3Handler.disconnectWallet().then(() => {
      this.authService.logout();
    });
  }

  ngOnInit() {}
}
