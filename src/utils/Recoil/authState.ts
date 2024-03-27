import { atom } from 'recoil';

export const authState = atom({
  key: 'amtekAuthstate',
  default: false, // Assuming initially not authenticated
});
