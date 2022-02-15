import { useSelector } from 'react-redux';
import './BasketHover.scss';

export default function BasketHover() {
  const { basketItems } = useSelector(state => state.basketItems);

  return (
    <div className="basket-hover">
      <h4>Ваша корзина:</h4>
      {basketItems.slice(0, 3).map(item => {
        return (
          <div className="basket-hover-item">
            <img
              src={
                item.img.split('/')[0] === 'https:'
                  ? item.img
                  : `/storage/${item.img}`
              }
              alt={item.title}
            />
            <p>{`${item.title.slice(0, 30)}...`}</p>
            <p>{`${item.price} ₽`}</p>
            <p>{`${item.count} шт.`}</p>
          </div>
        );
      })}
      {basketItems.length > 3 ? (
        <span>Перейдите в корзину, чтобы увидеть все товары</span>
      ) : null}
    </div>
  );
}
