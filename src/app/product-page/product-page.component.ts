import { Component, inject, Output } from '@angular/core';
import { ProductCardListComponent } from '../product-card-list/product-card-list.component';
import { Product } from '../model/product';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [ProductCardListComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {
  router = inject(Router)

  private productService = inject(ProductService);

  products!: Product[];

  ngOnInit(): void {
    this.products = this.productService.getDate();
  }

  @Output()
  onView(product: Product): void {
    this.router.navigate(['product', 'view', product.id]);
  }

  @Output()
  onEdit(product: Product): void {
    this.router.navigate(['product', 'form', product.id]);
  }
}
