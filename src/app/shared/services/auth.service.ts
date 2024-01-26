import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import firebase from 'firebase';
import 'firebase/auth';
import { Observable, map } from 'rxjs';
import { Web3Handler } from 'src/web3';
import { Web3Result } from 'src/web3/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  observeAuthState(
    func: firebase.Observer<any, Error> | ((a: firebase.User | null) => any)
  ) {
    return firebase.auth().onAuthStateChanged(func);
  }

  authenticateMetamask() {
    // return firebase.auth().
    return Promise.all([
      firebase.auth().signInAnonymously(),
      Web3Handler.connectWallet(),
    ]);
  }

  constructor(
    private toastController: ToastController,
    private router: Router
  ) {}

  login(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  async logout(): Promise<Web3Result<null>> {
    return firebase
      .auth()
      .signOut()
      .then(() => Web3Handler.disconnectWallet());
  }

  register(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  async resetPassword(email: string) {
    try {
      await firebase.auth().sendPasswordResetEmail(email);

      const toast = await this.toastController.create({
        message: 'Password reset email sent. Check your inbox.',
        duration: 2000,
      });
      toast.present();
    } catch (error) {
      const toast = await this.toastController.create({
        message: (error as Error).message,
        duration: 2000,
      });
      toast.present();
    }
  }
}
