import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePokemonPage } from './profile-pokemon.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePokemonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePokemonPageRoutingModule {}
