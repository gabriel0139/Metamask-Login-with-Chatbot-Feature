// tab1.page.ts
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChatbotPage } from '../chatbot/chatbot.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor(public modalController: ModalController) {}

  async openChatbot() {
    const modal = await this.modalController.create({
      component: ChatbotPage,
      cssClass: 'customChatbot', // Optional: you can define custom CSS class for styling
      // You can pass data to the modal if needed using 'componentProps'
    });
    return await modal.present();
  }
}
