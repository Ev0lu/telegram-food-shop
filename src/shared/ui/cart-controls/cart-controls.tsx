import React from 'react';
import s from './cart-controls.module.css';
import { shopping_cart } from '../../../shared/assets';

interface CartControlsProps {
  itemId: string;
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const CartControls: React.FC<CartControlsProps> = ({ count, onIncrease, onDecrease }) => {
  return (
    <div className={s.cart_controls}>
      {count > 0 ? (
        <div className={s.cart_buttons}>
          <button className={s.decrease_button} onClick={onDecrease}>
            -
          </button>
          <p>{count}</p>
          <button className={s.increase_button} onClick={onIncrease}>
            +
          </button>
        </div>
      ) : (
        <button className={`${s.main_catalog_item_add_button_main}`} onClick={onIncrease}>
          <img src={shopping_cart} alt="В корзину" />
          <p>В корзину</p>
        </button>
      )}
    </div>
  );
};
