import { nanoid } from 'nanoid';

import type Menu from '../../src/types/Menu';

/**
 * Menu for Go Home.
 */
const goHomeMenus: Menu[] = [
  {
    id: nanoid(),
    name: 'Ayam Hemat',
    price: 74000,
    description: 'Ayam hemat yang tinggal digoreng!',
    photo: 'https://i.pinimg.com/736x/17/d7/eb/17d7ebc2b1e224b245aba20e5ba7d6b3.jpg',
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
    photo: 'https://i.pinimg.com/736x/17/d7/eb/17d7ebc2b1e224b245aba20e5ba7d6b3.jpg',
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
    photo: 'https://i.pinimg.com/736x/17/d7/eb/17d7ebc2b1e224b245aba20e5ba7d6b3.jpg',
    photoRef: '',
    category: 'Go Home',
    created: Date.now(),
    updated: Date.now(),
  },
  {
    id: nanoid(),
    name: 'Bebek Boss',
    price: 155000,
    description: 'Bebek boss yang tinggal digoreng!',
    photo: 'https://i.pinimg.com/736x/17/d7/eb/17d7ebc2b1e224b245aba20e5ba7d6b3.jpg',
    photoRef: '',
    category: 'Go Home',
    created: Date.now(),
    updated: Date.now(),
  },
];

export default goHomeMenus;
