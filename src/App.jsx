import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
} from "react-router-dom";
import { Layout, Menu, Form, Input, Button, message, Card, Alert } from "antd";
import axios from "axios";
import { AppHeader, MainPage, PostDetail, PostsPage } from "./pages/Main";

const { Header, Content } = Layout;

const App = () => (
  <Router>
    <Layout>
      <AppHeader />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/:id" element={<PostDetail />} />
      </Routes>
    </Layout>
  </Router>
);

export default App;
