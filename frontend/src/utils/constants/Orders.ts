export const orders = [
  {
    id: 0,
    supplier: 1,
    customer: 18,
    created_at: "28-05-2023",
    delivery_date: "02-06-2023",
    price: 150,
    status: "to_deliver",

    delivery_address: 10,
    products: [
      {
        product: 1,
        qty: 2,
      },
    ],
  },
  {
    id: 1,
    supplier: 3,
    customer: 18,
    products: [
      {
        product: 2,
        qty: 5,
      },
    ],
    created_at: "01-04-2023",
    delivery_date: "02-04-2023",
    delivery_address: 10,
    price: 50,
    status: "delivered",
  },
  {
    id: 2,
    supplier: 2,
    customer: 18,
    products: [
      {
        product: 3,
        qty: 4,
      },
    ],
    created_at: "05-06-2023",
    delivery_date: "12-06-2023",
    delivery_address: 12,
    price: 80,
    status: "to_deliver",
  },
];
