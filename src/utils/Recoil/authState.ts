// utils/Recoil/authState.ts
import { atom, DefaultValue } from 'recoil';

export const authState = atom({
  key: 'amtekAuthstate',
  default: () => {
    // Check if running in the client-side context before accessing localStorage
    if (typeof window !== 'undefined') {
      const storedAuthState = localStorage.getItem("authToken");
      return storedAuthState !== null ? true : false;
    } else {
      return false; // Default to not authenticated if running on server-side
    }
  },
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet(newValue => {
        if (newValue instanceof DefaultValue) {
          localStorage.removeItem("authToken");
        } else {
          localStorage.setItem("authToken", newValue() ? "token_value" : "");
        }
      });
    },
  ],
});
