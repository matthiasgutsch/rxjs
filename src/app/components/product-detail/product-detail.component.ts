import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService } from '../../services/product.services';
import { Subscription } from 'rxjs';
import { ProductPageActions } from 'src/app/state/actions';
import { State } from 'src/app/state';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/model/product';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html'
})

export class ProductDetailComponent implements OnInit {
  sessionId = Math.random();
  @Input() productDetail: any;
  @Output() onSelected = new EventEmitter<any>();
  sidebarVisible: boolean = false;
  subscription: Subscription;
  message: any;
  product: Product;
  productForm: FormGroup;

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


  displayProduct(product: Product | null): void {
    if (product && this.productForm) {
      // Reset the form back to pristine
      this.productForm.reset();

      // Update the data on the form
      this.productForm.patchValue({
        productName: product.productName,
        productCode: product.productCode,
        starRating: product.starRating,
        description: product.description
      });
    }
  }


  updateProduct(product: Product): void {
    this.store.dispatch(ProductPageActions.updateProduct({ product }));
    console.log(product)
  }

  saveProduct(product: Product): void {
    this.store.dispatch(ProductPageActions.createProduct({ product }));
  }

  
  onSelectedProductDetail(productDetail: any[]) {
    this.onSelected.emit(productDetail);
    this.store.dispatch(ProductPageActions.setCurrentProduct({ currentProductId: this.productDetail.id }));
    this.store.dispatch(ProductPageActions.setLastSavedProduct({ lastSavedProductId: this.productDetail }));    
  }

  setProductList(productDetail: any[]) {
    this.store.dispatch(ProductPageActions.setCurrentProduct({ currentProductId: this.productDetail.id }));
    this.store.dispatch(ProductPageActions.setLastSavedProduct({ lastSavedProductId: this.productDetail }));    
  }

  sendMessage(): void {
    // send message to subscribers via observable subject
    this.productService.sendMessage(this.productDetail.name + ' email sending');
    console.log('email was sending')
}

}