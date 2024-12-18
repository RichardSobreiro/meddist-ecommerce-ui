/** @format */

export interface Address {
  id?: string;
  userId?: string;
  cep: string;
  address: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}
