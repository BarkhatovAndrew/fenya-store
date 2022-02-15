import { Link } from 'react-router-dom';

export default function Breadcrumbs({ currentItem }) {
  const currentUrl = window.location.pathname;
  const breadcrumbs = currentUrl.split('/');

  return (
    <>
      <div className="breadcrumbs">
        <Link to={'/'}>главная</Link>
        <span className="separate">{'>'}</span>
        <Link to={`/${breadcrumbs[1]}`}>{breadcrumbs[1]}</Link>
        <Link to={`/${breadcrumbs[1]}/${breadcrumbs[2]}`}>
          {Number(breadcrumbs[2]) ? null : (
            <>
              <span className="separate">{'>'}</span>
              <span>{breadcrumbs[2]}</span>
            </>
          )}
        </Link>
        <span className="separate">{'>'}</span>
        <span className="current-url">{`${currentItem?.title?.slice(
          0,
          40
        )}...`}</span>
      </div>
    </>
  );
}
