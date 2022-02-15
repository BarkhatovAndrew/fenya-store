import { Link } from 'react-router-dom';
import './BulletinBoardCard.scss';

function BulletinBoardCard({ animal }) {
  return (
    <div className="animal-card">
      <div className="animal-img">
        <Link to={`/board/animal/${animal.id}`}>
          <img
            src={
              animal.img.split('/')[0] === 'https:'
                ? animal.img
                : `/storage/${animal.img}`
            }
            alt="Фото питомца"
          />
        </Link>
      </div>
      <div className="animal-info">
        <Link to={`/board/animal/${animal.id}`}>
          <h4>{animal.title}</h4>
        </Link>

        <p>
          <strong>Порода</strong>: {animal.breed}
        </p>
        <p>
          <strong>Кличка</strong>: {animal.name}
        </p>
        <p>
          <strong>Возраст</strong>: {animal.age}
        </p>
        <Link to={`/board/animal/${animal.id}`}>Подробнее</Link>
      </div>

      {/* <h4>Информация о владельце</h4>
      <p>
        <strong>Город</strong>: {animal.city}
      </p>
      <p>
        <strong>Имя</strong>: {animal.User.name}{' '}
      </p>
      <p>
        <strong>Телефон</strong>: {animal.User.phone}
      </p>
      <p>
        <strong>Дата размещения</strong>: {animal.updatedAt.slice(0, 10)}
      </p> */}
    </div>
  );
}

export default BulletinBoardCard;
