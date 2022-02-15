import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function OrderList() {
  const orders = useSelector(state => state.orders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_GET_ORDER_LIST' });
  }, [dispatch]);

  const deleteFetch = event => {
    const id = event.target.dataset.id;
    dispatch({ type: 'FETCH_DELETE_ORDER', payload: id });
  };

  console.log(orders, 'orders');
  return (
    <ul>
      {orders?.length ? (
        orders.map(order => (
          <li key={order.id}>
            {order.Item.title}
            {order.Order.id}
            <button data-id={order.id}>Принять в работу</button>
            <button data-id={order.id} onClick={deleteFetch}>
              Удалить
            </button>
          </li>
        ))
      ) : (
        <p>Заказов нет</p>
      )}
    </ul>
  );
}
