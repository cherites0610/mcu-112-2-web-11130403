import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Product } from '../model/product';
import { map } from 'rxjs';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IProductForm } from './product-form.interface';

@Component({
  selector: 'app-product-form-page',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './product-form-page.component.html',
  styleUrl: './product-form-page.component.css'
})
export class ProductFormPageComponent {
  private readonly route = inject(ActivatedRoute);

  product !: Product;

  form = new FormGroup<IProductForm>({
    id: new FormControl<number | null>(null),
    name: new FormControl<string | null>(null),
    company: new FormControl<string | null>(null),
    authors: new FormArray<FormControl<string | null>>([]),
    isShow: new FormControl<boolean>(false, { nonNullable: true }),
    price: new FormControl<string | null>(null),
  });

  get authors(): FormArray<FormControl<string | null>> {
    return this.form.get('authors') as FormArray<FormControl<string | null>>;
  }

  onAddAuthors(): void {
    const formControl = new FormControl<string | null>(null);
    this.authors.push(formControl);
  }

  ngOnInit(): void {
    this.route.data.pipe(map(({ product }: Data) => product)).subscribe((product) => (this.product = product));
  }
}
