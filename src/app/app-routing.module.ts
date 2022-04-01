import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogCountListComponent } from './catalog-count/catalog-count-list.component';
import { CatalogCountComponent } from './catalog-count/catalog-count.component';
import { AuthService } from './login/auth.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: 'cc',
    canActivate: [AuthGuard],
    component: CatalogCountListComponent,
  },
  {
    path: 'cc/edit',
    canActivate: [AuthGuard],
    component: CatalogCountComponent,
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
