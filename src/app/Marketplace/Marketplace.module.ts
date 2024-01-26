import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarketplacePage } from './Marketplace';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { MarketplacePageRoutingModule } from './Marketplace-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    MarketplacePageRoutingModule
  ],
  declarations: [MarketplacePage]
})
export class MarketplacePageModule {}
