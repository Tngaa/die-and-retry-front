import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './primeng.module';
import { HttpClientModule } from '@angular/common/http';
import { VideogameService } from './services/videogame.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrimengModule,
    HttpClientModule
  ],
  exports: [PrimengModule],
  providers: [
    VideogameService,
  ]
})
export class SharedModule { }
