export interface AlertState {
  isOpen: boolean;
  title: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
  showAlert: (
    message: string,
    title?: string,
    type?: 'info' | 'success' | 'error' | 'warning'
  ) => void;
  hideAlert: () => void;
}
