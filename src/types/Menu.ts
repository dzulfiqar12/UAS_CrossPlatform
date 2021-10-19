/**
 * Data type for 'Menu' entity.
 */
type Menu = {
  id: string;
  name: string;
  price: number;
  description: string;
  photo: string;
  category: 'Paket' | 'Ala Carte' | 'Go Home';
  created: number;
  updated: number;
};

export default Menu;
