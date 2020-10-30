import { Component, OnInit } from '@angular/core';
import { Juego } from "./juego";
import { JuegoService } from './juego.service';
import { AlertService } from '../alert/alert.service'

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {
  showID: boolean = false;

  switchID(): void {
    this.showID = !this.showID;
  }
  ver(titulo): void {
    console.log(titulo);
    console.log("1")
  }
  juegos: Juego[]
  

  constructor(private alertService: AlertService, private juegoService: JuegoService) { }

  ngOnInit(): void {
    this.juegoService.getJuegos().subscribe(
      juegos => this.juegos = juegos
    );
    this.refreshJuegos();
  }
  deleteJuego(juego: Juego): void {
    if(confirm(`¿Está seguro que desea eliminar el juego "${juego.titulo}"?`)) {
      this.juegoService.deleteJuego(juego.idJuego).subscribe(
        response => {
          this.alertService.success(`Se ha boorado correctamente el juego "${juego.titulo}" con ID: ${juego.idJuego}`, {autoClose: true});
          this.refreshJuegos();
        }
      );
    }
  }
  private refreshJuegos(): void {
    this.juegoService.getJuegos().subscribe(
      juegos => this.juegos = juegos
    );
  }
}
