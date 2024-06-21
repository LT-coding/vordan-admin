import { RequestFormState, useRequestFormStore } from './requestForm'

export const useAppStore = (
  store: 'requestForm' | undefined,
  storeKey: keyof RequestFormState | undefined
) => {
  switch (store) {
    case 'requestForm':
      return useRequestFormStore((state) =>
        storeKey !== undefined ? state[storeKey] : undefined
      )

    default:
      throw new Error(`Unsupported store: ${store}`)
  }
}
