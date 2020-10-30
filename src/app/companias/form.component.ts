import { Component, OnInit } from '@angular/core';
import { Juego } from '../juegos/juego';
import { JuegoService } from '../juegos/juego.service';
import { ActivatedRoute, Router } from '@angular/router'
import { Companias } from '../companias/companias'
import { CompaniaService } from '../companias/compania.service'
import { AlertService } from '../alert/alert.service'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  companias: Companias[];
  juego: Juego = new Juego();
  title: string = 'Crear Juego';

  constructor(private alertService: AlertService, private juegoService: JuegoService, private companyService: CompaniaService, private router: Router, private activatedRoute: ActivatedRoute) { }
  

  ngOnInit(): void {
    this.companyService.getCompanias().subscribe(
      companias => this.companias = companias
    );
    this.loadJuego();
  }

  loadJuego(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.title = 'Editar Juego';
        this.juegoService.getJuego(id).subscribe(
          juego => this.juego = juego
        );
      } else {
        this.title = 'Crear Juego';
      }
    });
  }

  compareCompania(companiaToCompare: Companias,companiaSelected: Companias) :Boolean {
    if(!companiaToCompare || !companiaSelected){
      return false;
    }
    return companiaToCompare.idCompania === companiaSelected.idCompania;
  }

  createJuego(): void {
    this.juegoService.createJuego(this.juego).subscribe(juego =>{
      this.alertService.success(`Se ha añadido correctamente el juego "${juego.titulo}" con ID: ${juego.idJuego}`, {autoClose: true});
      this.router.navigate(['/juegos'])
    }
    );
  }
  public update(): void {
    this.juegoService.update(this.juego).subscribe(juego => {
      this.alertService.success(`Se ha actualizado correctamente el juego "${juego.titulo}" con ID: ${juego.idJuego}`, {autoClose: true});
      this.router.navigate(['/juegos']);
    }
    );
  }

}
