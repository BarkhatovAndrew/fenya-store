import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App/App';
import Cats from './components/Cats/Cats';
import Dogs from './components/Dogs/Dogs';
import Main from './components/Main/Main';
import ItemForm from './components/ItemForm/ItemForm';
import Basket from './components/Basket/Basket';
import './index.scss';
import { store } from './redux/store';
import { Registration } from './components/App/Registration/Registration';
import Item from './components/Item/Item';
import OrderForm from './components/OrderForm/OrderForm';
import Login from './components/App/Login/Login';

import ItemList from './components/ItemList/ItemList';
import ItemEditForm from './components/ItemEditForm/ItemEditForm';
import Category from './components/Category/Category';
import Profile from './components/App/Profile/Profile';
import About from './components/About/About';
import OrderList from './components/OrderList/OrderList';
import BulletinBoard from './components/BulletinBoard/BulletinBoard';
import AdminPage from './components/AdminPage/AdminPage';
import SearchResults from './components/SearchResults/SearchResults';
import AnimalsForm from './components/animalsForm/AnimalsForm';
import AnimalPage from './components/AnimalPage/AnimalPage';
import NotFound from './components/NotFound/NotFound';
import BoardList from './components/BoardList/BoardList';
import AdminReviewsList from './components/AdminReviewsList/AdminReviewsList';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Main />} />
          <Route path="registration" element={<Registration />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="about" element={<About />} />

          <Route path="cats" element={<Cats />} />
          <Route path="dogs" element={<Dogs />} />

          <Route path=":category" element={<Category />} />
          <Route path="cats/:category" element={<Category />} />
          <Route path="dogs/:category" element={<Category />} />

          <Route path=":category/:id" element={<Item />} />
          <Route path="cats/:category/:id" element={<Item />} />
          <Route path="dogs/:category/:id" element={<Item />} />

          <Route path="admin" element={<AdminPage />}>
            <Route path="items" element={<ItemList />} />
            <Route path="items/add" element={<ItemForm />} />
            <Route path="items/:id" element={<ItemEditForm />} />
            <Route path="orders" element={<OrderList />} />
            <Route path="animal/check" element={<BoardList />} />
            <Route path="reviews/check" element={<AdminReviewsList />} />
            <Route path="animal/addform" element={<AnimalsForm />} />
          </Route>

          <Route path="basket" element={<Basket />} />
          <Route path="basket/orderform" element={<OrderForm />} />
          <Route path="board" element={<BulletinBoard />} />
          <Route path="board/animal/:id" element={<AnimalPage />} />
          <Route path="search/results" element={<SearchResults />} />
          <Route path="items/:id" element={<Item />} />
          <Route path="search/results/:id" element={<Item />} />
          <Route path="addform" element={<AnimalsForm />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
