import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {NgxPanZoomModule} from "ngx-panzoom";
import { RounderPipe } from './pipes/rounder/rounder.pipe';
import {MenuModule} from "./components/menu/menu.module";

@NgModule({
  declarations: [
    AppComponent,
    RounderPipe,
  ],
  imports: [
    BrowserModule,
    NgxPanZoomModule,
    MenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
