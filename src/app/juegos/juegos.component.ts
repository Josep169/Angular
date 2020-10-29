import { Component, OnInit } from '@angular/core';
import { Juego } from "./juego";
import { JuegoService } from './juego.service';

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
  

  constructor(private juegoService: JuegoService) { }

  ngOnInit(): void {
    this.juegoService.getJuegos().subscribe(
      juegos => this.juegos = juegos
    );
  }

}
