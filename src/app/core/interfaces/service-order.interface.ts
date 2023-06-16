
import { StatusEnums } from '../enums/status-orden-service.enums';
import { IVehicleOption } from './vehicle.options.interface';
export interface IServiceOrder {
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
  id: number;
  title: string;
  entryDate: string;
  entryTime: string;
  departureDate: string;
  conclusions: string;
  faultDescription: string;
  vehicleReception: IVehicleOption[];
  mileage: number;
  fuel: number;
  authorizations: IVehicleOption[];
  status: StatusEnums;
  owner: Owner;
  driver: Owner;
  vehicle: Vehicle;
  technical: Owner;
  warranty: boolean;
}

interface Vehicle {
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
  owner?: any;
  driver?: any;
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
  accountNonLocked: boolean;
  authorities: Authority[];
  username: string;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
}

interface Authority {
  authority: string;
}
