import { IClient } from "./client.interface";

export interface ISession {
  names: string;
  nickname: string;
  lastnames: string;
  id: number;
  rol: string;
  sub: string;
  iat: number;
  exp: number;
}
