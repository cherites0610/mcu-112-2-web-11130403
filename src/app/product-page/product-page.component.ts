import { Component, inject, Output } from '@angular/core';
import { ProductCardListComponent } from '../product-card-list/product-card-list.component';
import { Product } from '../model/product';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { startWith, Subject, switchMap } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [AsyncPipe, ProductCardListComponent, JsonPipe,ReactiveFormsModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {
  router = inject(Router)

  private productService = inject(ProductService);

  products!: Product[];

  private readonly refresh$ = new Subject<void>();

  protected readonly formControl = new FormControl<string | undefined>(undefined);

  protected pageSize = 5;

  pageIndex = 1;

  readonly totalCount$ = this.refresh$.pipe(
    startWith(undefined),
    switchMap(() => this.productService.getCount())
  );

  readonly products$ = this.refresh$.pipe(
    startWith(undefined),
    switchMap(() => this.productService.getList(undefined, 1, 5))
  );

  onAdd(): void {
    const product = new Product({
      name: '書籍 Z',
      authors: ['作者甲', '作者乙', '作者丙'],
      company: '博碩文件',
      isShow: true,
      imgUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      createDate: new Date(),
      price: 10000,
    });
    this.productService.add(product).subscribe(() => this.refresh$.next());
  }

  @Output()
  onView(product: Product): void {
    this.router.navigate(['product', 'view', product.id]);
  }

  @Output()
  onEdit(product: Product): void {
    this.router.navigate(['product', 'form', product.id]);
  }

  @Output()
  onRemove({ id }: Product): void {
    // console.log(id);
    this.productService.remove(id).subscribe(() => this.refresh$.next());
  }
}
