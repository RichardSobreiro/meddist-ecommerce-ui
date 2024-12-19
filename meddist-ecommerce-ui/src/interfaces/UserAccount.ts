/** @format */

import { Address } from "./Address";

export interface UserAcount {
  userId?: string;
  fullName: string;
  username: string;
  password: string;
  passwordConfirmation: string;
  telephone: string;
  email: string;
  cpf: string;
  cnpj: string;
  companySocialReason: string;
  addresses: Address[];
}
