export interface Customer {
  loyalty: string;
  _id: string;
  name: string;
  phone: string;
  totalSpent: number;
  transactions?: {
    _id: string;
    createdAt: string;
    services: { _id: string; name: string; price: number }[];
  }[];
}
