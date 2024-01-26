import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.page.html',
  styleUrls: ['./referral.page.scss'],
})
export class ReferralPage implements OnInit {
  referralLink = 'https://ecothreads.com.sg/r/weaINje9823KMMlhIwfoo00';

  constructor() { }

  ngOnInit() {
  }

  async copyReferralLink() {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(this.referralLink);
        console.log('Referral link copied to clipboard');
        // You might want to display a toast message to the user here.
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    } else {
      // Clipboard API not available, you may want to use a fallback or display an error message.
    }
  }

  inviteContacts() {
    // Logic to access the contact list and send an invitation
    // This will likely involve using the Cordova/ Capacitor Contacts plugin or a similar library.
  }
}
