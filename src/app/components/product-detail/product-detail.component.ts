import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService } from '../../services/product.services';
import { Subscription } from 'rxjs';
import { ProductPageActions } from 'src/app/state/actions';
import { State } from 'src/app/state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.sass'],
})

export class ProductDetailComponent implements OnInit {
  sessionId = Math.random();
  @Input() productDetail: any;
  @Output() onSelected = new EventEmitter<any>();
  sidebarVisible: boolean = false;
  subscription: Subscription;
  message: any;

  constructor(private productService: ProductService,
    private store: Store<State>) {
    this.subscription = this.productService.getMessage().subscribe(message => { this.message = message; });
  }

  ngOnInit() {
    this.productDetail = '';
    if(this.productDetail > 0) {
      this.sidebarVisible = true;
    }
  }

  onSelectedProductDetail(productDetail: any[]) {
    this.onSelected.emit(productDetail);
    console.log(this.productDetail.id);
    this.store.dispatch(ProductPageActions.setCurrentProduct({ currentProductId: this.productDetail.id }));
    this.store.dispatch(ProductPageActions.setLastSavedProduct({ lastSavedProductId: this.productDetail.id }));    
  }

  sendMessage(): void {
    // send message to subscribers via observable subject
    this.productService.sendMessage(this.productDetail.name + ' email sending');
    console.log('email was sending')
    this.store.dispatch(ProductPageActions.setLastSavedProduct({ lastSavedProductId: this.productDetail.id }));    

}

}