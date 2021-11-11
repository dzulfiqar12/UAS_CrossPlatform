import type { Action, Context } from '../types/Context';
import { DefaultContext } from './context';

/**
 * Reducer helps to manage global state while keeping type-hints correct.
 * Reducer also helps to avoid wrong data types and actions.
 *
 * @param state - Our Context value
 * @param action - Valid action command and its payload to control global context
 * @returns React Context Reducer
 */
const reducer = (state: Context, action: Action): Context => {
  switch (action.type) {
    case 'addNewOrderItem':
      // Try to find if there is any existing menu in our Order context.
      // If there is no duplicate, then we will concat them to the resulting state.
      const duplicateIdx = state.items.findIndex((item) => item.menuId === action.payload.menuId);
      if (duplicateIdx === -1) {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }

      // If there is a duplicate, create a hard copy of the array, and modify its previous quantity with the new one.
      const modifiedOrder = state.items.slice();
      modifiedOrder[duplicateIdx].quantity = action.payload.quantity;
      return {
        ...state,
        items: modifiedOrder,
      };

    case 'deleteOrderItem':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case 'deleteOrderItems':
      return {
        ...state,
        items: [],
      };

    case 'initializeContext':
      return action.payload;

    case 'resetContext':
      return DefaultContext;

    case 'setCustomerName':
      return {
        ...state,
        customerName: action.payload,
      };

    case 'setOrderItemQuantity':
      const modifiedItem = state.items.slice();
      const modifiedIndex = state.items.findIndex((item) => item.id === action.payload.id);
      modifiedItem[modifiedIndex].quantity = action.payload.newQuantity;

      return {
        ...state,
        items: modifiedItem,
      };

    case 'setTableName':
      return {
        ...state,
        tableName: action.payload,
      };

    default:
      throw new Error(`Reducer does not support action type ${action}!`);
  }
};

export default reducer;
