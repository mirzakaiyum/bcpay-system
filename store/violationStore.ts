import { create } from 'zustand';
import initialViolations from '@/public/data/violation-reports.json';

interface Violation {
  id: string;
  employee: string;
  team: string;
  violation: string | undefined;
  date: string;
  amount: number | undefined;
}

interface ViolationStore {
  violations: Violation[];
  addViolation: (violation: Omit<Violation, 'id'>) => void;
}

export const useViolationStore = create<ViolationStore>((set) => ({
  violations: initialViolations.map(v => ({ ...v, id: v.id.toString() })) || [],
  addViolation: (newViolation) => 
    set((state) => ({
      violations: [
        ...state.violations,
        {
          ...newViolation,
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // More unique ID generation
        }
      ],
    })),
}));