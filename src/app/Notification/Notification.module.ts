import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationPage } from './Notification.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { NotificationPageRoutingModule } from './Notification-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    NotificationPageRoutingModule
  ],
  declarations: [NotificationPage]
})
export class NotificationPageModule {}
