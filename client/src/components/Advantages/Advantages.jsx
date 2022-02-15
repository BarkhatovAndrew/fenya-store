import './Advantages.scss';

export default function Advantages() {
  return (
    <div className="advantages-block">
      <h2>Наши преимущества</h2>
      <div className="row">
        <div className="col">
          <img src="/img/shopping.png" width={80} alt="" />
          <h5>Бонусная программа</h5>
        </div>
        <div className="col">
          <img src="/img/fast-delivery.png" width={80} alt="" />
          <h5>Быстрая доставка</h5>
        </div>
        <div className="col">
          <img src="/img/boxes.png" width={80} alt="" />
          <h5>Самовывоз заказа</h5>
        </div>
        <div className="col">
          <img src="/img/notification.png" width={80} alt="" />
          <h5>Подписка на доставку</h5>
        </div>
      </div>
    </div>
  );
}
