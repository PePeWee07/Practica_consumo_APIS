import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PokeDescription } from '../model/PokeDescription';
import { Pokemon } from '../model/Pokemon';
import { PokeTypeRelations } from '../model/PokeTypeRelations';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-profile-pokemon',
  templateUrl: './profile-pokemon.page.html',
  styleUrls: ['./profile-pokemon.page.scss'],
})
export class ProfilePokemonPage implements OnInit {

  profileID: number;
  pokeRegister: Pokemon[]=[];
  pokeMoves: any[]=[];
  pokeStat: any[]=[];
  pokeAbility: any[]=[];
  pokeType: any[]=[];
  hiddem_type: boolean = false;
  pokeName: string;
  pokeWeight: string;
  pokeHeight: string;

  urlEspecies: string;
  pokeDescription: PokeDescription[]=[];
  txtDescription: string;
  pokeHabitat: string;
  mysthic = false;
  legend = false;

  urlTypeRelation: any[]=[];
  typeRelations: PokeTypeRelations[]=[];
  typeRelations2: PokeTypeRelations[]=[];
  doubleDamageFrom: any[]=[];
  doubleDamageFrom2: any[]=[];
  halfDamageFrom: any[]=[];
  halfDamageFrom2: any[]=[];
  noDamageFrom: any[]=[];
  noDamageFrom2: any[]=[];
  doubleDamageTo: any[]=[];
  doubleDamageTo2: any[]=[];
  halfDamageTo: any[]=[];
  halfDamageTo2: any[]=[];
  noDamageTo: any[]=[];
  noDamageTo2: any[]=[];
  hiddem_type2: boolean = false;

  constructor(private idRoute: ActivatedRoute, private _pokeService: PokemonService, private alertController: AlertController) { }

  poke() {
    this.profileID = Number(this.idRoute.snapshot.paramMap.get('id'));
    this._pokeService.getPokemon(this.profileID).subscribe(resp => {
      let {name, id, sprites, abilities, base_experience, height, weight, moves, stats, types, species} = resp;
      //Recorro item de Moves
      moves.forEach(item => {
        this.pokeMoves.push(item.move.name)
      });
      //Recorro las Abilitys
      abilities.forEach(item => {
        this.pokeAbility.push(item.ability.name)
      });
      //Recorro las Types
      types.forEach(item => {
        this.pokeType.push(item.type.name)
        return this.urlTypeRelation.push(item.type.url)
      });
      //Recorro item de Stats
      stats.forEach(item =>{
        let baseNumber = item.base_stat;
        let baseName = item.stat.name
        let power = (baseNumber+' - '+baseName)
        this.pokeStat.push(power);
      })
      this.pokeRegister.push({ name, id, sprites, abilities, base_experience, height, weight, moves, stats, types, species});
      return this.pokeName = resp.name.charAt(0).toUpperCase()+name.slice(1), this.convertWeight(resp.weight), this.convertHeight(resp.height), this.urlEspecies = species.url
    }, (err) => {
      console.log("Erro: ", err);
    }, () => {
      // complet
      this.poketypes();
      this.pokeDescriptions();
      this.pokeTypeRelations();
    });
  }

  //tipo pokemon visible
  poketypes(){
    if (this.pokeType.length == 1) {
    } else {
      return this.hiddem_type = true
    }
  }

  //Separo numero de peso
  convertWeight(p:number){
    if(String(p).length == 1){
      // si solo tiene un numero 
      this.pokeWeight = String(p)
    }else {
      // varios numeros
      // agg una coma + capturoel ultmio digito 
        let x = ','+String(p).substr(-1) //,5
      // elimino el ultimo caracter
        let z = String(p).substring(0, String(p).length - 1);
      // los uno
        this.pokeWeight = z + x
    }
  }

  //Separo numero de alto
  convertHeight(h:number){
    if(String(h).length == 1){
      this.pokeHeight = '0,'+String(h)
    }else{
      // varios numeros
      // agg una coma + capturo el ultmio digito 
      let x = ','+String(h).substr(-1) //,5
      // elimino el ultimo caracter
        let z = String(h).substring(0, String(h).length - 1);
      // los uno
        this.pokeHeight = z + x
    }
  }

  //Descripcion
  pokeDescriptions(){
    this._pokeService.getDescription(this.urlEspecies).subscribe(
      (res) => {
        // des: FlavorTextEntry[] = lenguage: color = name
        let {is_legendary, is_mythical, habitat, flavor_text_entries} = res

        //Obtengo la descripcion del pokemon
        this.txtDescription = flavor_text_entries[0].flavor_text;
        try {
          if (habitat.name === null) {
            this.pokeHabitat = 'Uknown'
            console.log("Habitad: ", this.pokeHabitat);
          } else {
            this.pokeHabitat = habitat.name 
            console.log("Habitad else: ", this.pokeHabitat);
          }
        } catch (error) {
          console.log(error);
          
        }
        this.pokeDescription.push({is_legendary, is_mythical, habitat, flavor_text_entries})
        return this.mysthic = is_mythical, this.legend = is_legendary
      }, (err) => {
        console.log("Error al obtener la descripcion: ",err);
      })
  }

  pokeTypeRelations(){
  /*  GUIA DE TIPO DE RELACIONES
-------(no_damage_to)
1).-Una lista de tipos en los que este tipo no tiene efecto./ no hace daño
-------(half_damage_to)
2).-Una lista de tipos contra los que este tipo no tiene mucho efecto./ hace poco daño
-------(double_damage_to)
3).-Una lista de tipos contra los que este tipo tiene mucho efecto./ hace mucho daño


-------(no_damage_from)
4).-Una lista de tipos que no tienen ningún efecto sobre este tipo./ No recibo daño
-------(half_damage_from)
5).-Una lista de tipos que no son muy efectivos contra este tipo./ recibo poco daño
-------(double_damage_from)
6).-Una lista de tipos que son muy efectivos contra este tipo./ recibo muhco daño

move_damage_class{The class of damage inflicted by this type./La clase de daño infligido por este tipo.}

 */

    const url1 = this.urlTypeRelation[0];
    const url2 = this.urlTypeRelation[1];

    if (this.urlTypeRelation.length == 1) {
      //primer typo
      this._pokeService.getTypeRelation(url1).subscribe(
        (res) => {
          let {move_damage_class, damage_relations} = res;

          // DEFENSA
          //recorremos double_damage_from
            damage_relations.double_damage_from.forEach((item) => {
              this.doubleDamageFrom.push(item.name)
            })
            //recorremos half_damage_from
            damage_relations.half_damage_from.forEach(item => {
              this.halfDamageFrom.push(item.name)
            })
            //recorremos no_damage_from
            damage_relations.no_damage_from.forEach(item => {
              this.noDamageFrom.push(item.name)
            })

            // ATAK
            //recorro double_damage_to
            damage_relations.double_damage_to.forEach(item => {
              this.doubleDamageTo.push(item.name)
            })
            //recorro half_damage_to
            damage_relations.half_damage_to.forEach(item => {
              this.halfDamageTo.push(item.name)
            })
            //recorro no_damage_to
            damage_relations.no_damage_to.forEach(item => {
              this.noDamageTo.push(item.name)
            }, (err) => {
              console.log("Error: ", err);
            })   

          this.typeRelations.push({move_damage_class, damage_relations})
        }, (err) => {
          console.log('Error: ', err);
        }
      )
    } else {
      this.hiddem_type2 = true
    //primer typo
    this._pokeService.getTypeRelation(url1).subscribe(
      (res) => {
        let {move_damage_class, damage_relations} = res;

        // DEFENSA
        //recorremos double_damage_from
          damage_relations.double_damage_from.forEach((item) => {
            this.doubleDamageFrom.push(item.name)
          })
          //recorremos half_damage_from
          damage_relations.half_damage_from.forEach(item => {
            this.halfDamageFrom.push(item.name)
          })
          //recorremos no_damage_from
          damage_relations.no_damage_from.forEach(item => {
            this.noDamageFrom.push(item.name)
          })

          // ATAK
          //recorro double_damage_to
          damage_relations.double_damage_to.forEach(item => {
            this.doubleDamageTo.push(item.name)
          })
          //recorro half_damage_to
          damage_relations.half_damage_to.forEach(item => {
            this.halfDamageTo.push(item.name)
          })
          //recorro no_damage_to
          damage_relations.no_damage_to.forEach(item => {
            this.noDamageTo.push(item.name)
          }, (err) => {
            console.log("Error: ", err);
          })   

        this.typeRelations.push({move_damage_class, damage_relations})
      }, (err) => {
        console.log('Error: ', err);
      }
    )

    // segundo typo
      this._pokeService.getTypeRelation(url2).subscribe(
        (res) => {
          let {move_damage_class, damage_relations} = res;

          // DEFENSA
          //recorremos double_damage_from
          damage_relations.double_damage_from.forEach((item) => {
            this.doubleDamageFrom2.push(item.name)
          })
          //recorremos half_damage_from
          damage_relations.half_damage_from.forEach(item => {
            this.halfDamageFrom2.push(item.name)
          })
          //recorremos no_damage_from
          damage_relations.no_damage_from.forEach(item => {
            this.noDamageFrom2.push(item.name)
          })

          // ATAK
          //recorro double_damage_to
          damage_relations.double_damage_to.forEach(item => {
            this.doubleDamageTo2.push(item.name)
          })
          //recorro half_damage_to
          damage_relations.half_damage_to.forEach(item => {
            this.halfDamageTo2.push(item.name)
          })
          //recorro no_damage_to
          damage_relations.no_damage_to.forEach(item => {
            this.noDamageTo2.push(item.name)
          })

          this.typeRelations2.push({move_damage_class, damage_relations})
        }, (err) => {
        console.log('Error: ', err);
        }
      )
    }
  }

  async infoTypes() {
    const alert = await this.alertController.create({
      // header: 'Alert',
      subHeader: 'Move Damage Class:',
      message: 'The class of damage inflicted by this type',
      buttons: ['OK'],
    });

    await alert.present();
  }

  ngOnInit() {
    this.poke();
  }

}
