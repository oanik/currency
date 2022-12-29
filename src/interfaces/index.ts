export interface CurrencyItem {
  name: string;
  value: string;
  isSelected: boolean;
}

export interface NavigationItem {
  id: number;
  title: string;
  route: string;
}

export interface ConvertParams {
  currency: string;
  amount: number;
}
