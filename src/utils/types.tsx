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
