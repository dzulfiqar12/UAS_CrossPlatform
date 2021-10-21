import { createContext, Dispatch } from 'react';

import type { Action, Context } from '../types/Context';

/**
 * Prepares a new constant in order to be used as the default value of a context.
 */
export const DefaultContext: Context = {
  customerName: '',
  items: [],
  tableName: '',
};

/**
 * Creates a context that is used to manage the global state.
 */
const OrderContext = createContext<{
  state: Context;
  dispatch: Dispatch<Action>;
}>({
  state: DefaultContext,
  dispatch: () => {},
});

export default OrderContext;
