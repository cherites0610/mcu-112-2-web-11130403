import { inject, Injectable } from "@angular/core";
import { ProductService } from "./product.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../model/product";

@Injectable({
    providedIn: 'root',
})

export class ProductRemoteService extends ProductService {
    private readonly url = 'http://localhost:3000/products';

    private readonly httpClient = inject(HttpClient)

    override getDate(): Observable<Product[]> {
        return this.httpClient.get<Product[]>(this.url);
    }

    override getById(productId: number): Observable<Product> {
        return this.httpClient.get<Product>(`${this.url}/${productId}`);
      }
}