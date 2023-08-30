import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/model/product';
import { State } from 'src/app/state';
import { ProductPageActions } from 'src/app/state/actions';
import { Add } from 'src/app/state/actions/product-page.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {
  sessionId = Math.random();
  sidebarVisible: boolean = false;
  lastSavedProductId: number;
  product: any;

  @Input() productList: any = [];
  @Output() public onSelected: EventEmitter<any> = new EventEmitter<any>();

  constructor(private store: Store<State>) {}

  onSelectedProduct(product: number) {
    this.onSelected.emit(product);
    this.sidebarVisible = true;
    this.store.dispatch(ProductPageActions.setCurrentProduct({ currentProductId: product }));
  }

  addTodo(product: Product) {
    this.store.dispatch(ProductPageActions.Add({ product: this.product.id }));
  }
}