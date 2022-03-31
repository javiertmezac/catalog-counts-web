import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogCountListComponent } from './catalog-count/catalog-count-list.component';
import { CatalogCountComponent } from './catalog-count/catalog-count.component';

const routes: Routes = [
  { path: 'cc', component: CatalogCountListComponent },
  { path: 'cc/edit', component: CatalogCountComponent },
  { path: '', component: CatalogCountListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
