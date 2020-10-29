import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { JuegosComponent } from './juegos/juegos.component';
import { JuegoService } from './juegos/juego.service';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './alert/alert.component';
import { RouterModule, Routes } from '@angular/router';
import { CompaniasComponent } from './companias/companias.component';
import { FormComponent as JuegosFormComponent } from './juegos/form.component';
import { FormsModule } from '@angular/forms';

const ROUTES: Routes = [{path: '', redirectTo: '/juegos', pathMatch: 'full'},
                        {path: 'juegos', component: JuegosComponent},
                        {path: 'juegos/form', component: JuegosFormComponent},
                        {path: 'companias', component: CompaniasComponent},
                        {path: 'juegos/form/:id', component: JuegosFormComponent}];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    JuegosComponent,
    AlertComponent,
    CompaniasComponent,
    JuegosFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    FormsModule
  ],
  providers: [JuegoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
