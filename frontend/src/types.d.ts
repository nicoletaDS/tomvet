type OrderItems = {
  id: number;
  product: number;
  order?: number;
  qty: number;
  price?: number;
};

type Pet = {
  id: number;
  name: string;
  birthday: string;
  cipNr: string;
  image: string;
  passport: boolean;
  owner: string;
  weight: number;
};

type Task = {
  id: number;
  title: string;
  pet: string;
  details: string;
  startDate: string;
  endDate: string;
  time: string;
  repeat: string;
  done: boolean;
  isTreatment: boolean;
};

type Appointment = {
  id: number;
  pet: number;
  date: string;
  time: string;
  service: number;
  doctor: number;
  details: string;
};

type Doctor = {
  id: number;
  title: string;
  name: string;
  email: string;
  phone: string;
  holidays: string[];
};

type Service = {
  id: number;
  title: string;
  details: string;
  time: number;
  doctors: Doctor[];
};

type Cabinet = {
  doctors: Doctor[];
  services: Service[];
};

type Address = {
  id: number;
  user: number;
  county: string;
  city: string;
  str: string;
  nr: number;
  apartament: number;
};

type OrderItem = {
  id: number;
  product: number;
  order: number;
  qty: number;
  price: number;
};

type Order = {
  id: number;
  orderItems: OrderItem[];
  delivery_address: Address;
};

type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  count_in_stock: number;
  image: string;
  price: number;
  sell_by: string;
};
