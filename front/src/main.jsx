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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
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
  {
    path: "/que",
    element: <QueMusic />,
  },
  {
    path: "/musicPlayer",
    element: <MusicPlayer />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
