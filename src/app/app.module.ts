import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginasModule } from './paginas/PaginasModule';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserInterceptorService } from './interceptores/UserInterceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PaginasModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: UserInterceptorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
