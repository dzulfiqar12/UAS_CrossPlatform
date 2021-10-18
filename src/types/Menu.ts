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
  created: Date;
  updated: Date;
};

export default Menu;
