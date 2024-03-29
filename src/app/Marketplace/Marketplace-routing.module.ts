import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketplacePage } from './Marketplace';

const routes: Routes = [
  {
    path: '',
    component: MarketplacePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketplacePageRoutingModule {}
