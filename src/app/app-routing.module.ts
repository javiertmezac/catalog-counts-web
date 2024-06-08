import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { SystemInfoComponent } from './about/system-info/system-info.component';
import { BranchComponent } from './branch/branch.component';
import { CatalogCountListComponent } from './catalog-count/catalog-count-list.component';
import { CatalogCountComponent } from './catalog-count/catalog-count.component';
import { LoginComponent } from './login/login.component';
import { PeriodEditComponent } from './period/period-edit.component';
import { PeriodComponent } from './period/period.component';
import { ReportEditComponent } from './reports/report-edit.component';
import { ReportsComponent } from './reports/reports.component';
import { AuthGuard } from './shared/auth.guard';
import { DefaultCustomRangeComponent } from './reports/default-custom-range/default-custom-range.component';
import { BranchEditComponent } from './branch/edit/branch-edit.component';
import { adminGuard } from './shared/admin.guard';
import { PersonaEditComponent } from './persona/edit/persona-edit.component';

const routes: Routes = [
  {
    path: 'cc',
    canActivate: [AuthGuard],
    component: CatalogCountListComponent,
  },
  {
    path: 'cc/:ccid/edit',
    // canActivate: [AuthGuard, WriteAccessGuard],
    canActivate: [AuthGuard],
    component: CatalogCountComponent,
  },
  {
    path: 'mision/details',
    canActivate: [AuthGuard],
    component: BranchComponent,

  },
  {
    path: 'mision/report',
    canActivate: [AuthGuard],
    component: ReportsComponent,
  },
  {
    path: 'mision/report/create',
    canActivate: [AuthGuard],
    component: DefaultCustomRangeComponent,
  },
  {
    path: 'mision/period/:periodid/report/:reportUuid/edit',
    canActivate: [AuthGuard],
    component: ReportEditComponent,
  },
  {
    path: 'period',
    canActivate: [AuthGuard],
    component: PeriodComponent,
  },
  {
    path: 'period/:periodid/edit',
    canActivate: [AuthGuard],
    component: PeriodEditComponent,
  },
  {
    path: 'about',
    canActivate: [AuthGuard],
    component: AboutComponent,
  },
  {
    path: 'about/system-info',
    canActivate: [AuthGuard],
    component: SystemInfoComponent,
  },
  {
    path: 'admin/accounts',
    canActivate: [adminGuard],
    component: BranchEditComponent,
  },
  {
    path: 'admin/personas',
    canActivate: [adminGuard],
    component: PersonaEditComponent,
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
