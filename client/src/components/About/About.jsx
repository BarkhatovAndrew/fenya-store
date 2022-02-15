import './About.scss';

export default function About() {
  return (
    <div className="about-container">
      <h1>О нас</h1>
      <div className="about-info">
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3Aa9d947164b8a8ac784f8f7fd27398ce48cd722015543ea46019da6c617cd3371&amp;source=constructor"
          width="500"
          height="320"
          frameBorder="0"
        ></iframe>
        <div className="about-context">
          <br />
          <br />
          <strong>Адрес:</strong> 191123, Санкт-Петербург, ул. Кирочная, д.19
          <br />
          <br />
          <strong>Время работы офиса:</strong> Пн-Вс с 10:00 до 22:00
          <br />
          <br />
          <strong>Телефон:</strong> 8-800-555-35-35
          <br />
          <br />
          <strong>Электронная почта: </strong>admin@fenyastore.ru
        </div>
      </div>
      <h3>Мы в ответе за тех, кого Вы приручили!</h3>
      <div className="about">
        <div className="text-about">
          Все питомцы — от маленькой рыбки до гигантской собаки — нуждаются в
          ласке, заботе и внимании.
          <br />
          <br />
          Кто бы ни был на Вашем попечении — крохотное существо или большой,
          серьезный зверь, — магазин зоотоваров Fenya-Store поможет Вам
          позаботиться о нем.
          <br />
          <br />С помощью наших товаров сделайте жизнь любимого животного
          долгой, счастливой и яркой.
        </div>
        <img src="img/about-photo.png" alt="about" />
      </div>
      <div className="about-site">
        Заказы через сайт принимаются круглосуточно!
      </div>
    </div>
  );
}
