import { nanoid } from 'nanoid';

import type { Context } from '../types/Context';
import type Transaction from '../types/Transaction';

/**
 * Creates an order object from an existing context.
 * Unwraps the 'state' object and will try to fabricate a new object based on 'Transaction' data type.
 *
 * @param state - Current state value of the application
 * @returns Transaction object to be sent to Firestore
 */
const createOrderFromContext = (state: Context): Transaction => {
  const transactionId = nanoid();
  const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const processedItems = state.items.map((item) => ({
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));

  return {
    id: transactionId,
    customerName: state.customerName,
    items: processedItems,
    tableName: state.tableName,
    totalPrice,
    created: Date.now(),
    status: 'In Progress',
  };
};

export default createOrderFromContext;
