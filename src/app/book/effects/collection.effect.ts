import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';

import * as collection from '../actions/collection';
import { Book } from '../../shared/model/book';


@Injectable()
export class CollectionEffect {

  /**
   * This effect makes use of the `startWith` operator to trigger
   * the effect immediately on startup.
   */
  @Effect()
  loadCollection$: Observable<Action> = this.actions$
    .ofType(collection.LOAD)
    .startWith(new collection.LoadAction())
    .map((book) => new collection.RemoveBookSuccessAction(book))
    .catch((book) => of(new collection.RemoveBookFailAction(book)));

  @Effect()
  addBookToCollection$: Observable<Action> = this.actions$
    .ofType(collection.ADD_BOOK)
    .map((action: collection.AddBookAction) => action.payload)
    .map((book) => new collection.RemoveBookSuccessAction(book))
    .catch((book) => of(new collection.RemoveBookFailAction(book)));


  @Effect()
  removeBookFromCollection$: Observable<Action> = this.actions$
    .ofType(collection.REMOVE_BOOK)
    .map((action: collection.RemoveBookAction) => action.payload)
    .map((book) => new collection.RemoveBookSuccessAction(book))
    .catch((book) => of(new collection.RemoveBookFailAction(book)));

  constructor(private actions$: Actions) { }
}
