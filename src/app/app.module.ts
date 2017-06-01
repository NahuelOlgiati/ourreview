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

import { StoreModule } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { reducer } from './book/reducers';
import { EffectsModule } from '@ngrx/effects';

import { AppRouterModule } from './app-router.module';

import 'hammerjs';

import { AuthGuard } from './shared/security/auth.guard';
import { AuthService } from './shared/security/auth.service';

import { LanguageService } from './shared/service/language.service';
import { UserService } from './shared/service/user.service';
import { MovieService } from './shared/service/movie.service';
import { BookService } from './shared/service/book.service';

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
import { PaginationComponent } from './shared/component/pagination/pagination.component';

// Book
import { FindBookPageComponent } from './book/find-book-page';
import { BookSearchComponent } from './book/book-search';
import { BookPreviewListComponent } from './book/book-preview-list';
import { BookPreviewComponent } from './book/book-preview';
import { BookAuthorsComponent } from './book/book-authors';
import { EllipsisPipe } from './book/pipes/ellipsis';
import { AddCommasPipe } from './book/pipes/add-commas';
import { BookEffect } from './book/effects/book.effect';
import { CollectionEffect } from './book/effects/collection.effect';
import { BookExistsGuard } from './book/guards/book-exists';
import { ViewBookPageComponent } from './book/view-book-page';
import { SelectedBookPageComponent } from './book/selected-book-page';
import { BookDetailComponent } from './book/book-detail';

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
    AngularFireAuthModule,

    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    EffectsModule.run(BookEffect),
    EffectsModule.run(CollectionEffect),
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
    PaginationComponent,

    FindBookPageComponent,
    BookSearchComponent,
    BookPreviewListComponent,
    BookPreviewComponent,
    BookAuthorsComponent,
    EllipsisPipe,
    AddCommasPipe,
    ViewBookPageComponent,
    SelectedBookPageComponent,
    BookDetailComponent
  ],
  providers: [
    AuthGuard,
    AuthService,
    LanguageService,
    UserService,
    MovieService,
    BookService,

    BookExistsGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogDeleteUser
  ]
})
export class AppModule {

}
