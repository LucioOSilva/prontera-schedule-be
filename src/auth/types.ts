export type Token = {
  token: string;
};

export type LoggedUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  tenantId: string;
  createdAt: Date;
};
