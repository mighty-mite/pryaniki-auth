export interface AuthContextType {
  token: string | null;
  setToken: (value: string) => void;
}

export interface TableData {
  companySigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string;
  employeeSignatureName: string;
  id: string;
}
