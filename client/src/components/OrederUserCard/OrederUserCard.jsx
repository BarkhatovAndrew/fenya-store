import React from 'react';

function OrederUserCard({ item, number }) {
  return (
    <div>
      <p>Заказ номер: {number}</p>
      <ul>
        {item.OrderItems.map(el => (
          <li>
            <img
              src={
                el.Item.img.split('/')[0] === 'https:'
                  ? el.Item.img
                  : `storage/${el.Item.img}`
              }
              alt="картика"
            />
            <p>Товар: {el.Item.title}</p>
            <p>Количество: {el.count}</p>
          </li>
        ))}
      </ul>
      <p>
        Общая сумма:{' '}
        {item.OrderItems.reduce(
          (acc, num) => acc + num.Item.price * num.count,
          0
        )}
      </p>
    </div>
  );
}

export default OrederUserCard;
