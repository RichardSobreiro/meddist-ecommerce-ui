/** @format */

// src/services/userAPI.ts
import { Address } from "@/interfaces/Address";
import axios from "axios";

interface UserRegistrationData {
  fullName: string;
  username: string;
  password: string;
  telephone: string;
  email: string;
  cpf: string;
  cnpj: string;
  companySocialReason: string;
  addresses: Address[];
}

export const registerUser = async (userData: UserRegistrationData) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/users/register",
      userData
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to register user"
      );
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
