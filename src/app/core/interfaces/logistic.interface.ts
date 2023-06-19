import { ITransportType } from "./Transport-type.interface";
import { IClient } from "./client.interface";

export interface ILogistics {
  id: number;
  productType: string;
  productQty: number;
  registerDate: string;
  deliveryDate: string;
  shippingPrice: number;
  discount: number;
  guideNumber: string;
  store: IStore;
  client: IClient;
  transportType: ITransportType;
}




export interface IStore {
  id: number;
  description: string;
  type: string;
  port: string;
}
