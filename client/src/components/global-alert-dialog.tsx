import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useAlertStore } from '@/store/alert';
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon } from 'lucide-react';

function cleanErrorMessage(message: string): string {
  if (!message) return '';

  // If it's an HTML error page (like from Express/Node.js)
  if (message.includes('<!DOCTYPE html>') || message.includes('<html>')) {
    // Try to extract content inside <pre> tag first (common in Express error stack traces)
    const preMatch = message.match(/<pre>([\s\S]*?)<\/pre>/i);
    if (preMatch && preMatch[1]) {
      return preMatch[1]
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/&nbsp;/g, ' ')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .trim();
    }

    // Fallback: try to extract content inside <body> tag
    const bodyMatch = message.match(/<body>([\s\S]*?)<\/body>/i);
    if (bodyMatch && bodyMatch[1]) {
      return bodyMatch[1]
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<[^>]+>/g, '') // Strip all other HTML tags
        .replace(/&nbsp;/g, ' ')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .trim();
    }
  }

  return message;
}

export function GlobalAlertDialog() {
  const { isOpen, title, message, type, hideAlert } = useAlertStore();
  const cleanedMessage = cleanErrorMessage(message);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CircleCheckIcon className="size-6 text-emerald-600 dark:text-emerald-400" />;
      case 'error':
        return <OctagonXIcon className="text-destructive size-6" />;
      case 'warning':
        return <TriangleAlertIcon className="size-6 text-amber-600 dark:text-amber-400" />;
      case 'info':
      default:
        return <InfoIcon className="size-6 text-blue-600 dark:text-blue-400" />;
    }
  };

  const getMediaBg = () => {
    switch (type) {
      case 'success':
        return 'bg-emerald-500/10 dark:bg-emerald-500/20';
      case 'error':
        return 'bg-destructive/10 dark:bg-destructive/20';
      case 'warning':
        return 'bg-amber-500/10 dark:bg-amber-500/20';
      case 'info':
      default:
        return 'bg-blue-500/10 dark:bg-blue-500/20';
    }
  };

  const getButtonVariant = () => {
    switch (type) {
      case 'error':
        return 'destructive';
      case 'warning':
        return 'outline'; // Or custom warning variant
      default:
        return 'default';
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && hideAlert()}>
      <AlertDialogContent size="default" className="max-w-[calc(100vw-2rem)] sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogMedia className={getMediaBg()}>{getIcon()}</AlertDialogMedia>
          <AlertDialogTitle className="font-heading text-lg font-semibold tracking-tight">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="text-muted-foreground max-h-[300px] overflow-y-auto pr-1 text-left font-sans text-sm leading-relaxed font-normal break-words whitespace-pre-wrap">
              {cleanedMessage}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            variant={getButtonVariant()}
            onClick={hideAlert}
            className="w-full sm:w-auto">
            OK
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
