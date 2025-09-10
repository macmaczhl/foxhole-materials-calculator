import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export interface ExistingItem {
  id: string
  stuffName: string
  count: number
}

interface ExistingState {
  items: ExistingItem[]
}

const initialState: ExistingState = {
  items: []
}

interface AddExistingItemPayload {
  stuffName: string
  count: number
}

interface ChangeExistingCountPayload {
  itemId: string
  count: number
}

// Helper function for validation
const isValidPositiveNumber = (n: number): boolean => Number.isFinite(n) && n > 0;

export const existingSlice = createSlice({
  name: 'existing',
  initialState,
  reducers: {
    addExistingItem: (state, action: PayloadAction<AddExistingItemPayload>) => {
      const { stuffName, count } = action.payload;
      if (!stuffName || !isValidPositiveNumber(count)) return;

      // Check if item already exists, update count if so
      const existingItem = state.items.find(item => item.stuffName === stuffName);
      if (existingItem) {
        existingItem.count += Math.floor(count);
      } else {
        state.items.push({
          id: nanoid(),
          stuffName,
          count: Math.floor(count)
        });
      }
    },
    removeExistingItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    changeExistingCount: (state, action: PayloadAction<ChangeExistingCountPayload>) => {
      const { itemId, count } = action.payload;
      const item = state.items.find(item => item.id === itemId);
      if (!item) return;

      if (isValidPositiveNumber(count)) {
        item.count = Math.floor(count);
      } else {
        // Remove item if count becomes invalid
        state.items = state.items.filter(item => item.id !== itemId);
      }
    },
    clearAllExisting: (state) => {
      state.items = [];
    }
  }
})

export const {
  addExistingItem,
  removeExistingItem,
  changeExistingCount,
  clearAllExisting
} = existingSlice.actions;

export const selectExistingItems = (state: RootState) => state.existing.items;

export default existingSlice.reducer;
