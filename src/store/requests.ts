import { create } from 'zustand'

interface RequestsState {
  globalSearch: string
}

export interface RequestsActions {
  setRequestsStateValue: (key: keyof RequestsState, value: string) => void
}

export const useRequestsStore = create<RequestsState & RequestsActions>()(
  (set) => ({
    setRequestsStateValue(key, value) {
      set({ [key]: value })
    },
    globalSearch: '',
  })
)
