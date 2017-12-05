import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { AuthModule} from './modules/Auth';
import { AppRoutingModule, routingComponents } from './app.routing';



import { ProfileComponent} from './components/profile/profile.component';

import { GraphqlService } from './modules/graphql/graphql.service';

import { reducer } from './reducers';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AuthModule.forRoot(),
    StoreModule.forRoot(reducer),
    //StoreDevtoolsModule.instrumentOnlyWithExtension(),
  ],
  providers: [GraphqlService],
  bootstrap: [AppComponent]
})

export class AppModule { }
