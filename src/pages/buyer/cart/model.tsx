import { useState } from 'react';
import { useCart } from '@/shared/api/cart';
import { useGetUserInfoQuery } from '@/shared/api/buyer-info';
import { useCreateOrderMutation } from '@/shared/api/orders';

//TODO: Add error handling

export const useCartModel = () => {
  const telegramId = sessionStorage.getItem('telegram_id');
  const { data } = useGetUserInfoQuery(telegramId);
  const { cart, maxPoints, minPoints, handleAddToCart, handleDecreaseItem, handleClearCart } = useCart();

  const points = data?.user.points >= maxPoints ? maxPoints : data?.user.points || 0;
  const totalCost = cart?.reduce((sum, item) => sum + item.item.price * item.count, 0) || 0;

  const [pointsUsed, setPointsUsed] = useState(0);
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [createOrder, { isLoading, isSuccess, error }] = useCreateOrderMutation();

  const handleCreateOrderWithDetails = async () => {
    try {
      const response = await createOrder({ points_spent: pointsUsed, email }).unwrap();
      if (response.payment_link) {
        handleClearCart();
        window.location.href = response.payment_link;
      }
    } catch (err) {
    }
  };

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return {
    cart,
    minPoints,
    points,
    totalCost,
    pointsUsed,
    setPointsUsed,
    email,
    setEmail,
    isModalOpen,
    setIsModalOpen,
    isEmailValid,
    isLoading,
    isSuccess,
    error,
    handleAddToCart,
    handleDecreaseItem,
    handleClearCart,
    handleCreateOrderWithDetails,
  };
};
