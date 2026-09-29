import type { CategoryColor } from '../../i18n/jobBoards';

// The colours a category can pick in job-board-list/boards.yaml, as brand
// classes (tailwind.config.js). Each is a filled dot readable on the light
// sheet; a new colour needs an entry here and in the schema's list.
export const categoryDot: Record<CategoryColor, string> = {
  yellow: 'bg-yellow',
  orange: 'bg-orange',
  purple: 'bg-purple',
  black: 'bg-black',
  pantone: 'bg-pantone',
  gold: 'bg-primary',
  plum: 'bg-background',
};
