import fs from 'fs';
import { nanoid } from 'nanoid';
import path from 'path';

/**
 * Menu for Packages.
 */
const packageMenus = [
  {
    id: nanoid(),
    name: 'Paket Hemat',
    price: 16000,
    description: 'Dapatkan ayam hemat + nasi dengan harga murah! Nasi tidak free refill.',
    photo: fs.readFileSync(path.join(__dirname, '..', 'img', 'ayam-hemat.webp')).toString('base64'),
    photoRef: '',
    category: 'Paket',
    created: Date.now(),
    updated: Date.now(),
  },
  {
    id: nanoid(),
    name: 'Spesial Ayam Hemat',
    price: 20000,
    description: 'Ayam hemat + nasi + tahu / tempe + kol crispy.',
    photo: fs.readFileSync(path.join(__dirname, '..', 'img', 'ayam-hemat.webp')).toString('base64'),
    photoRef: '',
    category: 'Paket',
    created: Date.now(),
    updated: Date.now(),
  },
  {
    id: nanoid(),
    name: 'Spesial Ayam',
    price: 23000,
    description: 'Ayam + nasi + tahu / tempe + kol crispy.',
    photo: fs.readFileSync(path.join(__dirname, '..', 'img', 'ayam-paket.webp')).toString('base64'),
    photoRef: '',
    category: 'Paket',
    created: Date.now(),
    updated: Date.now(),
  },
  {
    id: nanoid(),
    name: 'Paket Bebek',
    price: 24000,
    description: 'Bebek reguler + nasi + tahu / tempe + kol crispy.',
    photo: fs
      .readFileSync(path.join(__dirname, '..', 'img', 'bebek-hemat.webp'))
      .toString('base64'),
    photoRef: '',
    category: 'Paket',
    created: Date.now(),
    updated: Date.now(),
  },
  {
    id: nanoid(),
    name: 'Spesial Bebek',
    price: 31000,
    description: 'Bebek spesial + nasi + tahu / tempe + kol crispy.',
    photo: fs
      .readFileSync(path.join(__dirname, '..', 'img', 'bebek-paket.webp'))
      .toString('base64'),
    photoRef: '',
    category: 'Paket',
    created: Date.now(),
    updated: Date.now(),
  },
];

export default packageMenus;
