import { Component, OnInit } from '@angular/core';
import {  Pokemon } from '../model/Pokemon';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
})
export class PokemonPage implements OnInit {

  constructor(private _pokeService: PokemonService) { }

  pokeRegister: Pokemon[] = [];
  searchText: any;
  hidden_skeleton:number = 1;

  

  getPokedex(){
    for (let i = 1; i <= 800; i++) {
      this._pokeService.getPokemon(i).subscribe(resp => {
        setTimeout(() => {
        var {id, name, sprites} = resp;
        this.pokeRegister.push({id, name, sprites});
        return this.hidden_skeleton = 0;
        }, 3000);
      }, (err) => {
        console.log("Error: ", err);
        alert('Error')
      });
    } 
  }

  ngOnInit() {
    this.getPokedex();
  }

}
