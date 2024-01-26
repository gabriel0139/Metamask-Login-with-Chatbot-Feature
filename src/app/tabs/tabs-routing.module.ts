import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'Home',
        loadChildren: () => import('../Home/Home.module').then(m => m.HomePageModule)
      },
      {
        path: 'Marketplace',
        loadChildren: () => import('../Marketplace/Marketplace.module').then(m => m.MarketplacePageModule)
      },
      {
        path: 'Notification',
        loadChildren: () => import('../Notification/Notification.module').then(m => m.NotificationPageModule)
      },
      {
        path: 'Account',
        loadChildren: () => import('../Account/Account.module').then(m => m.AccountPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/Home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule) // Assuming you have a login module
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full' // Redirect to login page as default
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
