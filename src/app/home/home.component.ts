import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { ProductService } from '../services/product.services';
import { ApiService } from '../services/api.service';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { ProductDetailComponent } from '../components/product-detail/product-detail.component';
import { Observable, Subject, Subscription } from 'rxjs';
import { Product } from '../model/product';
import { Store } from '@ngrx/store';
import { Route, Router } from '@angular/router';
import { ProductPageActions } from '../state/actions';

import { State, getCurrentProduct, getError, getProducts, getShowProductCode, getShowProductDescription, getShowProductFilter } from 'src/app/state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements AfterViewInit, OnInit {

  @ViewChild(ProductListComponent) productList: Product;
  @ViewChild(ProductDetailComponent) productDetail: Product;

  selectedProduct: any;
  sessionId: any;
  sidebarVisible: boolean = false;
  showList: boolean = false;

  message: any;
  subscription: Subscription;
  newTodoText: string = "";
  displayCode$: Observable<boolean>;
  displayDescription$: Observable<boolean>;
  displayFilter$: Observable<boolean>;
  productsSize: number;
  selectedProduct$: any;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;
  lastSavedProduct: any;

  constructor(private productService: ProductService,
    private messageService: MessageService,
    private router: Router,
    private store: Store<State>,
    private apiService: ApiService) {


    }

  ngOnInit(): void {
    this.store.dispatch(ProductPageActions.loadProducts());

    this.selectedProduct$ = this.store.select(getCurrentProduct);
    this.products$ = this.store.select(getProducts);

    this.errorMessage$ = this.store.select(getError);

    this.displayCode$ = this.store.select(getShowProductCode);
    this.displayDescription$ = this.store.select(getShowProductDescription);
    this.displayFilter$ = this.store.select(getShowProductFilter);

  }

  ngAfterViewInit() {
    this.sessionId = this.productList.sessionId;
  }

  onSelectedProduct(product: string) {
    this.productService.setProduct(product);
    this.productService.selectedProduct$.subscribe((value) => {
      this.selectedProduct = value;
    });
    this.sidebarVisible = true;
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
    this.messageService.add({severity:'success', summary:'Saving', detail: this.selectedProduct.name});
    this.lastSavedProduct = this.selectedProduct;
    this.store.dispatch(ProductPageActions.setLastSavedProduct({ lastSavedProductId: this.lastSavedProduct }));
  }
}