export interface AuthContextType {
  token: string | null;
  setToken: (value: string) => void;
}

export interface ModalFormValues {
  companySigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string;
  employeeSignatureName: string;
}

export interface TableData extends ModalFormValues {
  id: string;
}

export enum Url {
  hostUrl = "https://test.v5.pryaniky.com",
  authUrl = "/ru/data/v3/testmethods/docs/login",
  getUrl = "/ru/data/v3/testmethods/docs/userdocs/get",
  createUrl = "/ru/data/v3/testmethods/docs/userdocs/create",
  deleteUrl = "/ru/data/v3/testmethods/docs/userdocs/delete/",
  editUrl = "/ru/data/v3/testmethods/docs/userdocs/set/",
}
