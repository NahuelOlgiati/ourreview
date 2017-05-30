import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import 'hammerjs';

import { AuthGuard } from './shared/security/auth.guard';
import { AuthService } from './shared/security/auth.service';

import { LanguageService } from './shared/service/language.service';
import { UserService } from './shared/service/user.service';
import { MovieService } from './shared/service/movie.service';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { DiscoverComponent } from './discover/discover.component';
import { DialogDeleteUser } from './profile/profile.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { MovieComponent } from './movie/movie.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SearchComponent } from './search/search.component';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { WatchLaterComponent } from './watch-later/watch-later.component';
import { AppRouterModule } from './app-router.module';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from '../environments/environment';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    AppRouterModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  declarations: [
    AppComponent,
    IndexComponent,
    DiscoverComponent,
    DialogDeleteUser,
    FavoriteComponent,
    MovieComponent,
    ProfileComponent,
    ResetPasswordComponent,
    SearchComponent,
    SignInComponent,
    SignUpComponent,
    UpcomingComponent,
    WatchLaterComponent,
  ],
  providers: [
    AuthGuard,
    AuthService,
    LanguageService,
    UserService,
    MovieService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogDeleteUser
  ]
})
export class AppModule {

}
