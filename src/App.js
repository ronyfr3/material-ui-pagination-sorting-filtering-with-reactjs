import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomeScreen from "./screen/HomeScreen";
import { getUsers } from "./App/api";
import { useSelector, useDispatch } from "react-redux";

const Products = React.lazy(() => import("./screen/Products"));
const Users = React.lazy(() => import("./screen/Users"));

const App = () => {

  const dispatch = useDispatch();
  
  const users = useSelector((state) => state.users);
  const { data, status } = users;

  const pageNumber = useSelector((state) => state.pageNumber.value);

  React.useEffect(() => {
    dispatch(getUsers(pageNumber));
  }, [dispatch, pageNumber]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen users={data} />} />
        <Route
          path="/users"
          element={
            <Suspense fallback={<p>loading...</p>}>
              <Users users={data} status={status}/>
            </Suspense>
          }
        />
        <Route
          path="/products"
          element={
            <Suspense fallback={<p>loading...</p>}>
              <Products />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
