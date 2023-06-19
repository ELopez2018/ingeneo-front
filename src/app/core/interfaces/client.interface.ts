export interface IClient {
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
