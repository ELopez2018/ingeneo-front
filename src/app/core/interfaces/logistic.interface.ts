export interface ILogistics {
  id: number;
  productType: string;
  productQty: number;
  registerDate: string;
  deliveryDate: string;
  shippingPrice: number;
  discount: number;
  guideNumber: string;
  store: Store;
  client: Client;
  transportType: TransportType;
}

interface TransportType {
  id: number;
  description: string;
  identificationCode: string;
  logistics: string[];
}

interface Client {
  id: number;
  email: string;
  password: string;
  names: string;
  lastNames: string;
  documentNumber: number;
  documentType: string;
  cellPhone: number;
  phone: number;
  role: string;
  enabled: boolean;
  accountNonLocked: boolean;
  username: string;
  authorities: Authority[];
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
  logistics: string[];
}

interface Authority {
  authority: string;
}

interface Store {
  id: number;
  description: string;
  type: string;
  port: string;
  logistics: string[];
}
