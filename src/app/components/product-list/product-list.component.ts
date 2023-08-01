import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state';
import { ProductPageActions } from 'src/app/state/actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass'],
})
export class ProductListComponent {
  sessionId = Math.random();
  sidebarVisible: boolean = false;
  @Input() productList: any = [];
  @Output() public onSelected: EventEmitter<any> = new EventEmitter<any>();
  constructor(private store: Store<State>) {}

  onSelectedProduct(product: number) {
    this.onSelected.emit(product);
    this.sidebarVisible = true;
    this.store.dispatch(ProductPageActions.setCurrentProduct({ currentProductId: product }));
  }



}