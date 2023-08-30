import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { Observable, Subject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Route, Router } from '@angular/router';

import {
  State,
  getCurrentProduct,
  getError,
  getLastSavedProductId,
  getProducts,
  getShowProductCode,
  getShowProductDescription,
  getShowProductFilter,
} from 'src/app/state';
import { Product } from 'src/app/model/product';
import { ProductPageActions } from 'src/app/state/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  selectedProduct: any;
  sessionId: any;
  sidebarVisible: boolean = false;
  showList: boolean = false;
  message: any;
  subscription: Subscription;
  newTodoText: string = '';
  displayCode$: Observable<boolean>;
  displayDescription$: Observable<boolean>;
  displayFilter$: Observable<boolean>;
  productsSize: number;
  selectedProduct$: any;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;
  lastSavedProduct: any;
  lastSavedProduct$: Observable<Product[]>;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private store: Store<State>,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(ProductPageActions.loadProducts());
    this.selectedProduct$ = this.store.select(getCurrentProduct);
    this.products$ = this.store.select(getProducts);
    this.errorMessage$ = this.store.select(getError);
    this.displayCode$ = this.store.select(getShowProductCode);
    this.displayDescription$ = this.store.select(getShowProductDescription);
    this.displayFilter$ = this.store.select(getShowProductFilter);
    this.lastSavedProduct$ = this.store.select(getLastSavedProductId);
  }

  saveProduct(product: Product): void {
    this.store.dispatch(ProductPageActions.createProduct({ product }));
  }

  updateProduct(product: Product): void {
    this.store.dispatch(ProductPageActions.updateProduct({ product }));
  }

  onSelectedProductDetail(productDetail: any[]) {
    this.onSelectedProductDetailChange();
  }

  onSelectedProductDetailChange() {
    this.sidebarVisible = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Saving',
      detail: this.selectedProduct.name,
    });

  }
}
