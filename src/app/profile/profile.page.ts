import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickMorty } from '../model/rickMorty';
import { RickAndMortyService } from '../services/rick-and-morty.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileId:number;
  charter: RickMorty[]=[];
  origin: string;
  constructor(
    private activateRoute:ActivatedRoute,
    private _httpRick: RickAndMortyService) { }

  ngOnInit() {
    //Obtengo el ID desde la URL
    this.profileId = Number(this.activateRoute.snapshot.paramMap.get('id'));
    this._httpRick.getCharacter(this.profileId).subscribe(resp =>{
      // Destructura Objetos ...resto
      // console.log(resp.origin.name);
      this.origin =  resp.origin.name
      const { id, name, status, species, gender, image, origin, location} = resp;
      //Paso lo necesario
      this.charter.push({ id, name, status, species, gender, image, origin, location});
    }, (err) =>{
      console.log("Error", err)
      //Error personaje no econtrado
      alert(err.error.error)
    })

  }

}
