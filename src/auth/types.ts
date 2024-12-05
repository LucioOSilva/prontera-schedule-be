export type Role =
  | 'superadmin'
  | 'admin'
  | 'receptionist'
  | 'doctor'
  | 'patient';

export type LoggedUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  tenantId: string;
  createdAt: Date;
};

export type Token = {
  token: string;
};

export type TokenValid = {
  isValid: boolean;
  decoded: LoggedUser;
};
