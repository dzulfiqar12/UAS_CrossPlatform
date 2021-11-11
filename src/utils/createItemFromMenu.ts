import { nanoid } from 'nanoid';

import type { Item } from '../types/Context';
import type Menu from '../types/Menu';

/**
 * Creates an order object from an existing context.
 * Unwraps the 'Menu' object and will try to fabricate a new object based on 'Item' data type.
 *
 * @param menu - Current state value of the application
 * @param quantity - Number of quantity to be added
 * @returns Item object to be sent to the cotext
 */
const createItemFromMenu = (menu: Menu, quantity: number): Item => {
  const orderItemId = nanoid();

  return {
    id: orderItemId,
    menuId: menu.id,
    name: menu.name,
    price: menu.price,
    quantity: quantity,
  };
};

export default createItemFromMenu;
