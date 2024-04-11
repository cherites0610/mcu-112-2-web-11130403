import { Product } from "./product";

const products = [
    new Product(
        1,
        "圖像 Angular 開發入門 第二版",
        "博碩文化",
        500,
        true,
        new Date(2024, 3, 10),
    ), new Product(
        1,
        "圖像 Angular 開發入門 第二版",
        "博碩文化",
        500,
        true,
        new Date(2024, 3, 10),
    )
];
products[0].setDisplay(false)
console.log(products)
