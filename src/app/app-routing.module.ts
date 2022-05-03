import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CatalogCountListComponent } from './catalog-count/catalog-count-list.component';
import { CatalogCountComponent } from './catalog-count/catalog-count.component';
import { AuthService } from './login/auth.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { WriteAccessGuard } from './shared/permissions/write-access.guard';

const routes: Routes = [
  {
    path: 'cc',
    canActivate: [AuthGuard],
    component: CatalogCountListComponent,
  },
  {
    path: 'cc/edit',
    canActivate: [AuthGuard, WriteAccessGuard],
    component: CatalogCountComponent,
  },
  {
    path: 'about',
    canActivate: [AuthGuard],
    component: AboutComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'cc', pathMatch: 'full' },
  { path: '**', redirectTo: 'cc', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
