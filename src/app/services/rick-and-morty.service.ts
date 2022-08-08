import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RickMorty } from '../model/rickMorty';


@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {

  constructor(private _http:HttpClient) { }
  ulrRick: String = "https://rickandmortyapi.com/api/character"
  
getCharacter(id:number){
    return this._http.get<RickMorty>(this.ulrRick+"/"+id)
  }
}
