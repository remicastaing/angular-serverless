import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { HttpModule } from '@angular/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from './app.routing';


import { AuthModule} from './modules/Auth';
import { ProfileComponent} from './components/profile/profile.component';

import { ApolloModule } from 'apollo-angular';

import { provideClients } from './apollo.clients';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AuthModule.forRoot(),
    ApolloModule.forRoot(provideClients)
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
