import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/login/Login.jsx";
import { store } from "./store.js";
import Music from "./components/music/Music.jsx";
import ArtistAlbums from "./components/artistAlbums";
import QueMusic from "./components/queMusic";
import MusicPlayer from "./components/musicPlayer/MusicPlayer.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/music",
            element: <Music />,
            children: [
              {
                path: "/music/:artist",
                element: <ArtistAlbums />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
