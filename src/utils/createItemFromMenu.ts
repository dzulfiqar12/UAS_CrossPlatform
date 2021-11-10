import { nanoid } from 'nanoid';

import type { Item } from '../types/Context';
import type Menu from '../types/Menu';

/**
 * Creates an order object from an existing context.
 * Unwraps the 'Menu' object and will try to fabricate a new object based on 'Item' data type.
 *
 * @param state - Current state value of the application
 * @returns Item object to be sent to the cotext
 */
const createItemFromMenu = (menu: Menu): Item => {
  const orderItemId = nanoid();

  return {
    id: orderItemId,
    name: menu.name,
    price: menu.price,
    quantity: 1,
  };
};

export default createItemFromMenu;
