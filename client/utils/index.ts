import { format } from 'date-fns';

export function formatDate(time?: Date | string | number) {
  if (!time) {
    return;
  }

  return format(new Date(time), 'Pp');
}
