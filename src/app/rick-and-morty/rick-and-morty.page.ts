import { Component, OnInit } from '@angular/core';
import { RickMorty } from '../model/rickMorty';
import { RickAndMortyService } from '../services/rick-and-morty.service';


@Component({
  selector: 'app-rick-and-morty',
  templateUrl: './rick-and-morty.page.html',
  styleUrls: ['./rick-and-morty.page.scss'],
})
export class RickAndMortyPage implements OnInit {

  constructor(private _rickAndMorty: RickAndMortyService) { }

  //rickAndMorty: rickMorty = new rickMorty();
  charter: RickMorty[] = [];
  searchText: any;

  ngOnInit() {
    this.getCharters();
  }

  getCharters(){
    for (let i = 1; i < 99; i++) {
      this._rickAndMorty.getCharacter(i).subscribe(resp =>{
        // console.log("RESPUESTA", resp)
        // Destructura Objetos ...resto
        const { id, name, image } = resp;
        //Paso lo necesario
        this.charter.push({ id, name, image });
      }, (err) =>{
        console.log("Error", err)
        //Error personaje no econtrado
        alert(err.error.error)
      })
    }
  }

  applyFilter(){
    
  }

}
