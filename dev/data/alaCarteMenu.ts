import fs from 'fs';
import { nanoid } from 'nanoid';
import path from 'path';

/**
 * Menu for Ala Carte.
 */
const alaCarteMenus = [
  {
    id: nanoid(),
    name: 'Ayam Hemat',
    price: 14000,
    description: 'Ayam biasa dengan versi yang lebih hemat.',
    photo: fs.readFileSync(path.join(__dirname, '..', 'img', 'ayam-hemat.webp')).toString('base64'),
    photoRef: '',
    category: 'Ala Carte',
    created: Date.now(),
    updated: Date.now(),
  },
  {
    id: nanoid(),
    name: 'Ayam',
    price: 17000,
    description: 'Ayam biasa yang merupakan favorit setiap orang.',
    photo: fs.readFileSync(path.join(__dirname, '..', 'img', 'ayam-paket.webp')).toString('base64'),
    photoRef: '',
    category: 'Ala Carte',
    created: Date.now(),
    updated: Date.now(),
  },
  {
    id: nanoid(),
    name: 'Bebek Reguler',
    price: 18000,
    description: 'Bebek biasa yang merupakan favorit setiap orang.',
    photo: fs
      .readFileSync(path.join(__dirname, '..', 'img', 'bebek-hemat.webp'))
      .toString('base64'),
    photoRef: '',
    category: 'Ala Carte',
    created: Date.now(),
    updated: Date.now(),
  },
  {
    id: nanoid(),
    name: 'Bebek',
    price: 26000,
    description: 'Bebek khas yang memiliki rasa sangat unik dan lezat.',
    photo: fs
      .readFileSync(path.join(__dirname, '..', 'img', 'bebek-ala-carte.webp'))
      .toString('base64'),
    photoRef: '',
    category: 'Ala Carte',
    created: Date.now(),
    updated: Date.now(),
  },
  {
    id: nanoid(),
    name: 'Nasi Putih',
    price: 4000,
    description: 'Nasi putih dengan kualitas tertinggi.',
    photo: fs.readFileSync(path.join(__dirname, '..', 'img', 'nasi-putih.webp')).toString('base64'),
    photoRef: '',
    category: 'Ala Carte',
    created: Date.now(),
    updated: Date.now(),
  },
  {
    id: nanoid(),
    name: 'Kol Crispy',
    price: 3000,
    description: 'Kol dengan rasa khas dan sangat lezat.',
    photo: fs.readFileSync(path.join(__dirname, '..', 'img', 'kol-crispy.webp')).toString('base64'),
    photoRef: '',
    category: 'Ala Carte',
    created: Date.now(),
    updated: Date.now(),
  },
  {
    id: nanoid(),
    name: 'Tahu',
    price: 2000,
    description: 'Tahu khas lengkap dengan timun.',
    photo: fs.readFileSync(path.join(__dirname, '..', 'img', 'tahu.webp')).toString('base64'),
    photoRef: '',
    category: 'Ala Carte',
    created: Date.now(),
    updated: Date.now(),
  },
  {
    id: nanoid(),
    name: 'Tempe',
    price: 2000,
    description: 'Tempe khas lengkap dengan timun.',
    photo: fs.readFileSync(path.join(__dirname, '..', 'img', 'tempe.webp')).toString('base64'),
    photoRef: '',
    category: 'Ala Carte',
    created: Date.now(),
    updated: Date.now(),
  },
  {
    id: nanoid(),
    name: 'Indomie',
    price: 10000,
    description: 'Indomie Goreng reguler yang lezat.',
    photo: fs.readFileSync(path.join(__dirname, '..', 'img', 'mie-goreng.webp')).toString('base64'),
    photoRef: '',
    category: 'Ala Carte',
    created: Date.now(),
    updated: Date.now(),
  },
  {
    id: nanoid(),
    name: 'Indomie + Telur',
    price: 14000,
    description: 'Indomie Goreng dengan bumbu spesial, ditambah dengan telur bebas.',
    photo: fs.readFileSync(path.join(__dirname, '..', 'img', 'mie-goreng.webp')).toString('base64'),
    photoRef: '',
    category: 'Ala Carte',
    created: Date.now(),
    updated: Date.now(),
  },
  {
    id: nanoid(),
    name: 'Bubble Drink',
    price: 10000,
    description: 'Minuman khas dengan rasa yang unik. Banyak rasa!',
    photo: fs
      .readFileSync(path.join(__dirname, '..', 'img', 'bubble-drink.webp'))
      .toString('base64'),
    photoRef: '',
    category: 'Ala Carte',
    created: Date.now(),
    updated: Date.now(),
  },
];

export default alaCarteMenus;
