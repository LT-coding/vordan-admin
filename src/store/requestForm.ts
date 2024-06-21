import { create } from 'zustand'

export interface RequestFormState {
  handleSaveTrigger: string
  isStatusChangeReasonDialogOpen: string
}

export interface RequestFormStateWithOthers extends RequestFormState {}

export interface RequestFormActions {
  setRequestFormStateValue: (key: keyof RequestFormState, value: string) => void
}

const initialState: RequestFormStateWithOthers = {
  handleSaveTrigger: '0',
  isStatusChangeReasonDialogOpen: '0',
}

export const useRequestFormStore = create<
  RequestFormStateWithOthers & RequestFormActions
>()((set) => ({
  ...initialState,
  setRequestFormStateValue(key, value) {
    set({ [key]: value })
  },
}))
