import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RickAndMortyPageRoutingModule } from './rick-and-morty-routing.module';

import { RickAndMortyPage } from './rick-and-morty.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RickAndMortyPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [RickAndMortyPage]
})
export class RickAndMortyPageModule {}
