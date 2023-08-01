import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { ProductService } from '../services/product.services';
import { ApiService } from '../services/api.service';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { ProductDetailComponent } from '../components/product-detail/product-detail.component';
import { Observable, Subject, Subscription } from 'rxjs';
import { Product } from '../model/product';
import { Store } from '@ngrx/store';
import { BooksApiActions } from '../state/books.actions';
import { Route, Router } from '@angular/router';
import { ProductPageActions } from '../state/actions';

import { State, getCurrentProduct, getError, getProducts, getShowProductCode, getShowProductDescription, getShowProductFilter } from 'src/app/state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements AfterViewInit, OnInit {

  @ViewChild(ProductListComponent) productList: Product;
  @ViewChild(ProductDetailComponent) productDetail: Product;

  selectedProduct: any;
  sessionId: any;
  sidebarVisible: boolean = false;
  message: any;
  subscription: Subscription;
  todos$: Observable<Product[]>;
  newTodoText: string = "";
  displayCode$: Observable<boolean>;
  displayDescription$: Observable<boolean>;
  displayFilter$: Observable<boolean>;
  productsSize: number;
  selectedProduct$: any;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;

  products = [
    { name: 'Rice', id: 1, price: 200 },
    { name: 'Beans', id: 2, price: 300 },
    { name: 'Bananna', id: 3, price: 400 },
  ];

  productsAdd = [
    { name: 'Rice1', id: 1, price: 200 },
    { name: 'Beans1', id: 2, price: 300 },
    { name: 'Bananna1', id: 3, price: 400 },
  ];

  constructor(private productService: ProductService,
    private messageService: MessageService,
    private router: Router,
    private store: Store<State>,
    private apiService: ApiService) {


    }

  ngOnInit(): void {

    this.selectedProduct$ = this.store.select(getCurrentProduct);
    this.products$ = this.store.select(getProducts);

    // Do NOT subscribe here because it uses an async pipe
    this.errorMessage$ = this.store.select(getError);
    this.store.dispatch(ProductPageActions.loadProducts());
    // Do NOT subscribe here because it uses an async pipe

    // Do NOT subscribe here because it uses an async pipe
    this.displayCode$ = this.store.select(getShowProductCode);
    this.displayDescription$ = this.store.select(getShowProductDescription);
    this.displayFilter$ = this.store.select(getShowProductFilter);

    this.apiService
    .getBooks()
    .subscribe((books) =>
      this.store.dispatch(BooksApiActions.retrievedBookList({ books }))
    );
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
    this.productService.setProductList(this.products);
    this.store.dispatch(ProductPageActions.setCurrentProduct({ currentProductId: 1 }));

  }

  onSelectedProductDetail(productDetail: any[]) {
    this.productService.setProductList(this.products = this.productsAdd);
    this.onSelectedProductDetailChange();
  }

  onSelectedProductDetailChange() {
    this.sidebarVisible = false;
    this.messageService.add({severity:'success', summary:'Saving', detail: this.selectedProduct.name});
  }
}