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

const { Header, Content } = Layout;

export const AppHeader = () => (
  <Header>
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
      <Menu.Item key="1">
        <Link to="/">Main Page</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/posts">Posts</Link>
      </Menu.Item>
    </Menu>
  </Header>
);

export const MainPage = () => {
  const [form] = Form.useForm();
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (values) => {
    try {
      await axios.post("https://api.pexels.com/v1/photos", values, {
        headers: {
          Authorization:
            "fqPGtfIxYYJdocnNC5XZwKcdaI0fmXaBI5hhz5Hd4lX1t94NlsgBgKHT",
        },
      });
      setAlert(
        <Alert
          message="Post успешно отправлен!"
          type="success"
          showIcon
          closable
        />
      );
      form.resetFields();
    } catch (error) {
      setAlert(
        <Alert
          message="Ошибка при отправке поста!"
          type="error"
          showIcon
          closable
        />
      );
    }
  };

  return (
    <Content style={{ padding: "20px" }}>
      <h2>Создать пост</h2>
      {alert}
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Введите заголовок!" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="body"
          label="Body"
          rules={[{ required: true, message: "Введите текст!" }]}>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};

export const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.pexels.com/v1/curated?page=1&per_page=10", {
        headers: {
          Authorization:
            "fqPGtfIxYYJdocnNC5XZwKcdaI0fmXaBI5hhz5Hd4lX1t94NlsgBgKHT",
        },
      })
      .then((response) => setPosts(response.data.photos))
      .catch(() => message.error("Ошибка загрузки постов!"));
  }, []);

  return (
    <Content style={{ padding: "20px" }}>
      <h2>Список постов</h2>
      {posts.map((post) => (
        <Card
          key={post.id}
          title={post.photographer}
          style={{ marginBottom: "16px" }}>
          <Link to={`/posts/${post.id}`}>
            <img src={post.src.medium} alt="Post" style={{ width: "100px" }} />
          </Link>
        </Card>
      ))}
    </Content>
  );
};

export const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.pexels.com/v1/photos/${id}`, {
        headers: {
          Authorization:
            "fqPGtfIxYYJdocnNC5XZwKcdaI0fmXaBI5hhz5Hd4lX1t94NlsgBgKHT",
        },
      })
      .then((response) => setPost(response.data))
      .catch(() => message.error("Ошибка загрузки поста!"));
  }, [id]);

  if (!post) return <p>Загрузка...</p>;

  return (
    <Content style={{ padding: "20px" }}>
      <h2>{post.photographer}</h2>
      <img src={post.src.large} alt="Post" style={{ width: "100%" }} />
    </Content>
  );
};
