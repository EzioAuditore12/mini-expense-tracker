import { create } from 'zustand';
import type { AlertState } from './type';

/**
 * Global alert dialog store — drives the <GlobalAlertDialog /> overlay.
 * Supports typed alerts (info, success, error, warning) with custom title + message.
 */
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

/**
 * Monkey-patch window.alert so all native alert() calls (including from
 * third-party code) route through the custom dialog instead of blocking the UI.
 * Auto-classifies the alert type by scanning for keywords in the message.
 */
if (typeof window !== 'undefined') {
  window.alert = (message: unknown) => {
    const messageStr = String(message);
    const lowerMessage = messageStr.toLowerCase();

    let type: 'info' | 'success' | 'error' | 'warning' = 'info';
    let title = 'Alert';

    // Keyword-based auto-classification of alert type
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
