import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { State } from '../state/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductService } from '../services/product.services';
import { getCurrentProduct, getLastSavedProductId, getProducts, getShowProductFilter } from '../state';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit{

  lastSavedProduct$: any;
  product: any;

  constructor(private productService: ProductService,
    private messageService: MessageService,
    private router: Router,
    private store: Store<State>,
    private apiService: ApiService) {


    }

  ngOnInit(): void {
    this.lastSavedProduct$ = this.store.select(getLastSavedProductId);

    this.product = this.productService.getProductsId();
    console.log(this.product)
    
    
  }


}
