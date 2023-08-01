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


  getBooks(): Observable<Array<Book>> {
    return this.http
      .get<{ items: Book[] }>(
        'https://www.googleapis.com/books/v1/volumes?maxResults=5&orderBy=relevance&q=oliver%20sacks'
      )
      .pipe(map((books) => books.items || []));
  }

  create(dto: any) {
    this.httpClient
      .post("https://jsonplaceholder.typicode.com/users", dto)
      .pipe(map(res => this.userStore$.value.push(res)))
      .subscribe();
  }

  get(): Observable<Product> {
    return this.httpClient.get<Product>('/some/rest/resource/path'+`/`);
  }
}