import { create } from 'zustand'

interface UserState {
  id: string
  name: string
  role: string
  email: string
}

export interface UserActions {
  setUserStateValue: (key: keyof UserState, value: string) => void
}

export const useUserStore = create<UserState & UserActions>()((set) => ({
  setUserStateValue(key, value) {
    set({ [key]: value })
  },
  id: '',
  name: '',
  role: '',
  email: '',
}))
