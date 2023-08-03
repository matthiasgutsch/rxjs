import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from './state/app.state';
import { Store } from '@ngrx/store';
import { getShowProductFilter } from './state';
import { ProductPageActions } from './state/actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  displayFilter$: Observable<boolean>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
  this.displayFilter$ = this.store.select(getShowProductFilter);

  }

  checkChangedFilter(): void {
    this.store.dispatch(ProductPageActions.toggleProductFilter());

  }

}