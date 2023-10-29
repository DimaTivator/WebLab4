import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ShotsListComponent } from './shots-list/shots-list.component';
import { HeaderTemplateComponent } from './header-template/header-template.component';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import { TimePageComponent } from './time-page/time-page.component';
import { FormComponent } from './form/form.component';
import { MainComponent } from './main/main.component';
import { CanvasComponent } from './canvas/canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    ShotsListComponent,
    HeaderTemplateComponent,
    TimePageComponent,
    FormComponent,
    MainComponent,
    CanvasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
