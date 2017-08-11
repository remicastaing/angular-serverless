import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from './app.routing';


import { AuthModule} from './modules/Auth';
import { ProfileComponent} from './components/profile/profile.component';

import { ApolloModule } from 'apollo-angular';

import { provideClients } from './apollo.clients';

import { NgReduxModule } from '@angular-redux/store';

import { StoreModule } from './modules/Store/store.module';

import { GraphqlService } from './modules/graphql/graphql.service';

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
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AuthModule.forRoot(),
    NgReduxModule,
    StoreModule,
    ApolloModule.forRoot(provideClients)
  ],
  providers: [GraphqlService],
  bootstrap: [AppComponent]
})

export class AppModule { }
