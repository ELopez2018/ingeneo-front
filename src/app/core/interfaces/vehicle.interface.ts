import { IClient } from "./client.interface";

export interface IVehicle {
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
  id: number;
  licensePlate: string;
  model: string;
  brand: string;
  year: number;
  color: string;
  cylinderCapacity: number;
  owner: Owner;
  driver: Owner;
}

interface Owner {
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
  id: number;
  nickname: string;
  password: string;
  names: string;
  lastNames: string;
  documentNumber: number;
  documentType: string;
  cellPhone: number;
  phone: number;
  email: string;
  role: string;
  enabled: boolean;
  authorities: Authority[];
  username: string;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
}

interface Authority {
  authority: string;
}
