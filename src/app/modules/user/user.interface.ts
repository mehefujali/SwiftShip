export enum Role {
  ADMIN = "ADMIN",
  SENDER = "SENDER",
  RECEIVER = "RECEIVER",
}

export interface IUser {
  name: string;
  email: string;
  password?: string;
  phone: string;
  address: string;
  role: Role;
  isActive: boolean;
}
