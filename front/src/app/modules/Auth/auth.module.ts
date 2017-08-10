import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from './auth.service';
import { AuthInterceptor, AuthResponseInterceptor } from './authInterceptor';
import { UserService } from './user.service';
import { OauthButtonsComponent } from './oauth-buttons/oauth-buttons.component';
import { UserReducer, IUserState } from './user.reducer';

import { AuthGuard } from './auth.guard';
import { CallbackComponent } from './callback/callback.component';

@NgModule({
    imports: [CommonModule],
    declarations: [OauthButtonsComponent],
    exports: [OauthButtonsComponent],
    providers: [AuthGuard]
})
export class AuthModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AuthModule,
            providers: [AuthService, UserService,
                [
                    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
                    { provide: HTTP_INTERCEPTORS, useClass: AuthResponseInterceptor, multi: true }
                ]
            ]
        };
    }
}

export const authComponents = [OauthButtonsComponent];


export { AuthService, UserService, AuthGuard, OauthButtonsComponent, CallbackComponent, UserReducer, IUserState };
