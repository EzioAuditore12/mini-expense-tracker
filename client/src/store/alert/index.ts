import { create } from 'zustand';
import type { AlertState } from './type';

export const useAlertStore = create<AlertState>((set) => ({
  isOpen: false,
  title: 'Alert',
  message: '',
  type: 'info',
  showAlert: (message, title = 'Alert', type = 'info') => {
    set({
      isOpen: true,
      message,
      title,
      type,
    });
  },
  hideAlert: () => set({ isOpen: false }),
}));

if (typeof window !== 'undefined') {
  window.alert = (message: any) => {
    const messageStr = String(message);
    const lowerMessage = messageStr.toLowerCase();

    let type: 'info' | 'success' | 'error' | 'warning' = 'info';
    let title = 'Alert';

    if (
      lowerMessage.includes('error') ||
      lowerMessage.includes('fail') ||
      lowerMessage.includes('expired') ||
      lowerMessage.includes('invalid') ||
      lowerMessage.includes('cannot') ||
      lowerMessage.includes('unable')
    ) {
      type = 'error';
      title = 'Error';
    } else if (
      lowerMessage.includes('success') ||
      lowerMessage.includes('updated') ||
      lowerMessage.includes('created') ||
      lowerMessage.includes('deleted') ||
      lowerMessage.includes('saved')
    ) {
      type = 'success';
      title = 'Success';
    } else if (
      lowerMessage.includes('warning') ||
      lowerMessage.includes('caution') ||
      lowerMessage.includes('attention')
    ) {
      type = 'warning';
      title = 'Warning';
    }

    useAlertStore.getState().showAlert(messageStr, title, type);
  };
}
