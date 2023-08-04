import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductService } from './services/product.services';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { MessagesModule } from 'primeng/messages';
import { Message, MessageService } from 'primeng/api';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { productReducer } from './state/product.reducer';
import { ProductEffects } from './state/product.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EntityDataModule } from '@ngrx/data';
import { environment } from 'src/environments/environment';
import { entityConfig } from './entity-metadata';
import { MainComponent } from './main/main.component';
import { ToastModule } from 'primeng/toast';

export function getInitialAppState() {
  const previousSettings = localStorage.getItem("settings")
  if (previousSettings  != null) {
       return JSON.parse(previousSettings);
  }
  return {};
}

export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductListComponent,
    ProductDetailComponent,
    SidebarComponent,
    MainComponent

  ],
  imports: [
    BrowserModule,
    SidebarModule,
    HttpClientModule,
    MessagesModule,
    TableModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    ReactiveFormsModule,
    ToastModule,
    FormsModule,
    InputTextModule,
    StoreModule.forFeature('products', productReducer),
    EffectsModule.forFeature([ProductEffects]),
    StoreModule.forRoot({initialState: getInitialAppState}, { metaReducers }),
    StoreDevtoolsModule.instrument({
      name: 'APM Demo App DevTools',
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
  ],
  providers: [ProductService, ApiService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
