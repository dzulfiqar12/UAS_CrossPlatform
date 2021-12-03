import fs from 'fs';
import { nanoid } from 'nanoid';
import path from 'path';

/**
 * Menu for Go Home.
 */
const goHomeMenus = [
  {
    id: nanoid(),
    name: 'Ayam Hemat',
    price: 74000,
    description: 'Ayam hemat yang tinggal digoreng!',
    photo: fs.readFileSync(path.join(__dirname, '..', 'img', 'ayam-hemat.webp')).toString('base64'),
    photoRef: '',
    category: 'Go Home',
    created: Date.now(),
    updated: Date.now(),
  },
  {
    id: nanoid(),
    name: 'Ayam Reguler',
    price: 90000,
    description: 'Ayam reguler yang tinggal digoreng!',
    photo: fs.readFileSync(path.join(__dirname, '..', 'img', 'ayam-paket.webp')).toString('base64'),
    photoRef: '',
    category: 'Go Home',
    created: Date.now(),
    updated: Date.now(),
  },
  {
    id: nanoid(),
    name: 'Bebek Reguler',
    price: 92000,
    description: 'Bebek reguler yang tinggal digoreng!',
    photo: fs
      .readFileSync(path.join(__dirname, '..', 'img', 'bebek-ala-carte.webp'))
      .toString('base64'),
    photoRef: '',
    category: 'Go Home',
    created: Date.now(),
    updated: Date.now(),
  },
  {
    id: nanoid(),
    name: 'Bebek Spesial',
    price: 155000,
    description: 'Bebek spesial yang tinggal digoreng!',
    photo: fs
      .readFileSync(path.join(__dirname, '..', 'img', 'bebek-paket.webp'))
      .toString('base64'),
    photoRef: '',
    category: 'Go Home',
    created: Date.now(),
    updated: Date.now(),
  },
];

export default goHomeMenus;
