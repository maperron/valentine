
export interface FormData {
  prenom: string;
  nom: string;
  dobDay: string;
  dobMonth: string;
  dobYear: string;
  address: string;
}

export enum ModalState {
  NONE = 'NONE',
  IDENTITY = 'IDENTITY',
  SUCCESS = 'SUCCESS'
}
