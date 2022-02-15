import './TopPanel.scss';

export default function TopPanel() {
  return (
    <>
      <div className="top-panel">
        <div className="container">
          <div className="left-top-panel">
            <p>
              Город: <span>Санкт-Петербург</span>
            </p>
            <p>Самовывоз, доставка, оплата</p>
            <p>Express (доставка за 1-4 часа)</p>
          </div>
          <div className="right-top-panel">
            <p className="phone-top-panel">
              <a href="tel:88005553535">8-800-555-35-35</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
