import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map, finalize, tap } from "rxjs/operators";
import { Product } from "../model/product";

export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: Array<string>;
  };
}

@Injectable({ providedIn: "root" })
export class ApiService {
  private userStore$ = new BehaviorSubject<any>([]);
  user$ = this.userStore$.asObservable();

  constructor(private httpClient: HttpClient, private http: HttpClient) {

  }

}