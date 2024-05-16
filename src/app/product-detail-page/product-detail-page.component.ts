import { Component, inject, Input, numberAttribute } from '@angular/core';
import { Product } from '../model/product';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.css'
})
export class ProductDetailPageComponent {
  @Input({ transform: numberAttribute })
  id!: number;

  product!: Product;

  productService = inject(ProductService); 

  ngOnInit(): void {
    // this.product = this.productService.getById(this.id);
    this.productService.getById(this.id).subscribe( (product) => (this.product = product) )
  }

  private router = inject(Router);

  onEdit(): void {
    this.router.navigate(['product', 'form', this.product.id]);
  }

  onBack(): void {
    this.router.navigate(['products']);
  }

  onRemove(): void {
    this.productService.remove(this.product.id);
    this.router.navigate(['products']);
  }
}
