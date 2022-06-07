import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogCountComponent } from './catalog-count/catalog-count.component';
import { CatalogCountListComponent } from './catalog-count/catalog-count-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './shared/auth.interceptor';
import { AboutComponent } from './about/about.component';
import { SystemInfoComponent } from './about/system-info/system-info.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportEditComponent } from './reports/report-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogCountComponent,
    CatalogCountListComponent,
    LoginComponent,
    AboutComponent,
    SystemInfoComponent,
    ReportsComponent,
    ReportEditComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
