export type Role =
  | 'superadmin'
  | 'admin'
  | 'receptionist'
  | 'doctor'
  | 'patient';

export type LoggedUser = {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  cpf?: string;
  gender?: string;
  maritalStatus?: string;
  tenantId: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  phoneIsWhatsapp: boolean;
  birthDate?: string;
  sex?: string;
};

export type Token = {
  token: string;
};

export type TokenValid = {
  isValid: boolean;
  decoded: LoggedUser;
};
