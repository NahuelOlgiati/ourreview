import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/security/auth.guard';
import { IndexComponent } from './index/index.component';
import { DiscoverComponent } from './discover/discover.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { MovieComponent } from './movie/movie.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SearchComponent } from './search/search.component';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { WatchLaterComponent } from './watch-later/watch-later.component';

import { ViewBookPageComponent } from './book/view-book-page';
import { BookExistsGuard } from './book/guards/book-exists';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'discover', component: DiscoverComponent },
  { path: 'favorites', component: FavoriteComponent, canActivate: [AuthGuard] },
  { path: 'movie/:id', component: MovieComponent },
  { path: 'book/:id', component: ViewBookPageComponent, canActivate: [BookExistsGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'search/:term', component: SearchComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'upcoming', component: UpcomingComponent },
  { path: 'watch-later', component: WatchLaterComponent, canActivate: [AuthGuard] }
];

export const AppRouterModule: ModuleWithProviders = RouterModule.forRoot(routes);
