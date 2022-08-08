import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokeDescription } from '../model/PokeDescription';
import { Pokemon } from '../model/Pokemon';
import { PokeTypeRelations } from '../model/PokeTypeRelations';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private _http:HttpClient) { }

  urlPoke: string = "https://pokeapi.co/api/v2/pokemon"

  getPokemon(id:number){
    return this._http.get<Pokemon>(this.urlPoke+"/"+id)
  }

  getDescription(urlDes:string){
    return this._http.get<PokeDescription>(urlDes);
  }

  getTypeRelation(urlType:string){
    return this._http.get<PokeTypeRelations>(urlType);
  }

}
