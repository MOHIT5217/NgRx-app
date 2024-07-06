import { Component, OnInit, Renderer2 } from '@angular/core';
import { Product } from '../interface/product';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  products: Product[] = [];
  selectedProduct: Product | null = null;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    const storedProducts = localStorage.getItem("productArr");
    if (storedProducts) {
      this.products = JSON.parse(storedProducts).map((product: any) => new Product(product.name, product.price, product.id));
    }

    const inputName = document.querySelector('#name') as HTMLInputElement;
    const inputPrice = document.querySelector('#price') as HTMLInputElement;
    const button = document.querySelector('#buttonSubmit') as HTMLButtonElement;

    button.addEventListener('click', (event) => {
      event.preventDefault();
      const nameValue = inputName.value;
      const priceValue = inputPrice.value;
      if (inputName.value.trim() !== '' && inputPrice.value.trim() !== '') {
        if (this.selectedProduct) {
          this.selectedProduct.name = nameValue;
          this.selectedProduct.price = Number(priceValue);
          this.selectedProduct = null;
          button.innerText = 'Add Product';
        } else {
          const product = new Product(nameValue, Number(priceValue), Math.round(Math.random() * 100));
          this.products.push(product);
        }
        inputName.value = '';
        inputPrice.value = '';
        localStorage.setItem('productArr', JSON.stringify(this.products));

        // Reapply styles to all li elements
        this.applyStylesToLiElements();
      }
    });

    // Apply initial styles to existing li elements
    this.applyStylesToLiElements();
  }

  applyStylesToLiElements() {
    const uList = document.querySelector('#uList') as HTMLUListElement;
    const liElements = uList.querySelectorAll('li');
    liElements.forEach((li) => {
      this.renderer.setStyle(li, 'display', 'flex');
      this.renderer.setStyle(li, 'justify-content', 'space-between');
      this.renderer.setStyle(li, 'align-items', 'center');
      this.renderer.setStyle(li, 'padding', '10px');
      this.renderer.setStyle(li, 'margin', '5px 0');
      this.renderer.setStyle(li, 'border', '1px solid #ccc');
      this.renderer.setStyle(li, 'border-radius', '5px');
      this.renderer.setStyle(li, 'background-color', '#f9f9f9');
    });
  }

  selectRow(obj: Product) {
    this.selectedProduct = obj;
    const inputName = document.getElementById('name') as HTMLInputElement;
    const inputPrice = document.getElementById('price') as HTMLInputElement;
    const button = document.getElementById('buttonSubmit') as HTMLButtonElement;
    inputName.value = obj.name;
    inputPrice.value = obj.price.toString();
    button.innerText = "Update";
  }

  deleteRow(obj: Product) {
    this.products = this.products.filter(product => product !== obj);
    localStorage.setItem("productArr", JSON.stringify(this.products));
    this.applyStylesToLiElements(); // Reapply styles after deletion
  }

  addProduct(name: HTMLInputElement, price: HTMLInputElement) {
    const ul = document.querySelector('#listProduct') as HTMLUListElement;
    const li = document.createElement('li') as HTMLLIElement;
    li.innerHTML = `${name.value} ${price.value}`
    ul.prepend(li);
    const span = document.createElement('span') as HTMLSpanElement;
    li.appendChild(span).innerText = `X`;
    span.addEventListener('click', () => {
      li.remove();
    })
    console.log(ul);
  }

}
