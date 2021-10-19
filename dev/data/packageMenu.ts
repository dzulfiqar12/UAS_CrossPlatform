import { nanoid } from 'nanoid';

import type Menu from '../../src/types/Menu';

const packageMenus: Menu[] = [
  {
    id: nanoid(),
    name: 'Paket Hemat',
    price: 16000,
    description: 'Dapatkan ayam hemat + nasi dengan harga murah! Nasi tidak free refill.',
    photo: 'https://i.pinimg.com/736x/17/d7/eb/17d7ebc2b1e224b245aba20e5ba7d6b3.jpg',
    category: 'Paket',
    created: Date.now(),
    updated: Date.now(),
  },
  {
    id: nanoid(),
    name: 'Koper Ayam Hemat',
    price: 20000,
    description: 'Ayam hemat + nasi + tahu / tempe + kol crispy.',
    photo: 'https://i.pinimg.com/736x/17/d7/eb/17d7ebc2b1e224b245aba20e5ba7d6b3.jpg',
    category: 'Paket',
    created: Date.now(),
    updated: Date.now(),
  },
  {
    id: nanoid(),
    name: 'Koper Ayam',
    price: 23000,
    description: 'Ayam + nasi + tahu / tempe + kol crispy.',
    photo: 'https://i.pinimg.com/736x/17/d7/eb/17d7ebc2b1e224b245aba20e5ba7d6b3.jpg',
    category: 'Paket',
    created: Date.now(),
    updated: Date.now(),
  },
  {
    id: nanoid(),
    name: 'Koper Bebek Reguler',
    price: 24000,
    description: 'Bebek reguler + nasi + tahu / tempe + kol crispy.',
    photo: 'https://i.pinimg.com/736x/17/d7/eb/17d7ebc2b1e224b245aba20e5ba7d6b3.jpg',
    category: 'Paket',
    created: Date.now(),
    updated: Date.now(),
  },
  {
    id: nanoid(),
    name: 'Koper Bebek Boss',
    price: 31000,
    description: 'Bebek boss + nasi + tahu / tempe + kol crispy.',
    photo: 'https://i.pinimg.com/736x/17/d7/eb/17d7ebc2b1e224b245aba20e5ba7d6b3.jpg',
    category: 'Paket',
    created: Date.now(),
    updated: Date.now(),
  },
];

export default packageMenus;
