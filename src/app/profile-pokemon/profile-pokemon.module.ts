import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePokemonPageRoutingModule } from './profile-pokemon-routing.module';

import { ProfilePokemonPage } from './profile-pokemon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePokemonPageRoutingModule
  ],
  declarations: [ProfilePokemonPage]
})
export class ProfilePokemonPageModule {}
