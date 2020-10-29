import { style } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
  })

export class HeaderComponent {
  person1: any = {name: 'Josep', lastname: 'Borras Regolf'};
}
