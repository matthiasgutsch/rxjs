import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { State } from '../state/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductService } from '../services/product.services';
import { getCurrentProduct, getLastSavedProductId, getProducts, getShowProductFilter } from '../state';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../model/product';
import { ProductPageActions } from '../state/actions';
import { ProductListComponent } from '../components/product-list/product-list.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements AfterViewInit, OnInit{

  selectedProduct: any;
  sessionId: any;
  sidebarVisible: boolean = false;
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
  lastSavedProduct$: Observable<Product[]>;

  @ViewChild(ProductListComponent) productList: Product;

  constructor(private productService: ProductService,
    private messageService: MessageService,
    private router: Router,
    private store: Store<State>,
    private apiService: ApiService) {

      this.store.dispatch(ProductPageActions.loadProducts());

      this.selectedProduct$ = this.store.select(getCurrentProduct);
      this.products$ = this.store.select(getProducts);

      
    }

    ngAfterViewInit() {
      this.sessionId = this.productList.sessionId;
    }


  ngOnInit(): void {
    
    this.lastSavedProduct$ = this.store.select(getLastSavedProductId);
  }


}
