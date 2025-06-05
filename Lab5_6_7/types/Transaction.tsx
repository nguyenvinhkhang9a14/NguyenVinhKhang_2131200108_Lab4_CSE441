export interface Transaction {
  _id: string;
  createdAt: string;
  customer: {
    _id: string;
    name: string;
    phone: string;
    loyalty: string;
    totalSpent: number;
  };
  services: {
    _id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
}
