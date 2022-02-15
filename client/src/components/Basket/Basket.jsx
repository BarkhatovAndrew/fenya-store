import BasketCard from '../BasketCard/BasketCard';
import { useSelector } from 'react-redux';
import TotalItemCard from '../TotalItemCard/TotalItemCard';
import './Basket.scss';
import { useEffect } from 'react';

function Basket() {
  const { basketItems } = useSelector(state => state.basketItems);

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basketItems));
  }, [basketItems]);

  return (
    <>
      <h1>Корзина</h1>
      <div className="basket">
        <div className="basket-items">
          {basketItems.length
            ? basketItems.map(item => <BasketCard key={item.id} item={item} />)
            : 'Нет товаров в корзине'}
        </div>
        <div className="basket-pay">
          <TotalItemCard />
        </div>
      </div>
    </>
  );
}

export default Basket;
