import { Component, OnInit } from '@angular/core';
import { Companias } from "./companias";
import { CompaniaService } from './compania.service';

@Component({
  selector: 'app-companias',
  templateUrl: './companias.component.html',
  styleUrls: ['./companias.component.css']
})
export class CompaniasComponent implements OnInit {

  showID: boolean = false;

  switchID(): void {
    this.showID = !this.showID;
  }

  /*ver(algo): void {
    console.log(algo);
  }*/

  companias: Companias[]
  

  constructor(private companiaService: CompaniaService) { }

  ngOnInit(): void {
    this.companiaService.getCompanias().subscribe(
      companias => this.companias = companias
    );
  }
}
