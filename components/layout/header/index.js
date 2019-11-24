import { Layout, Menu, Dropdown, Icon } from "antd";
import Link from "components/link";

const { Header } = Layout;
const UserContext = React.createContext(null);

export default function TopNavigation({ isLoggedIn, logout }) {
  // console.log("Header", logout);
  // console.log("Header", thislogout);
  return (
    <Header className="header">
      <Link href="/">
        <div className="logo" />
      </Link>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1">
          <Link href="/about">About</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link href="/contact">Contact</Link>
        </Menu.Item>
        <Menu.Item key="3" style={{ float: "right" }}>
          <UserContext.Provider value={logout}>
            {isLoggedIn ? <Dashboard /> : <Login />}
          </UserContext.Provider>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

const loginMenu = (
  <Menu>
    <Menu.Item>
      <Link href="/login">Login</Link>
    </Menu.Item>
    <Menu.Item>
      <Link href="/register">Register</Link>
    </Menu.Item>
  </Menu>
);

function Login() {
  return (
    <Dropdown overlay={loginMenu}>
      <a className="ant-dropdown-link" href="#">
        <Icon type="setting" />
      </a>
    </Dropdown>
  );
}

const dashboardMenu = (
  <UserContext.Consumer>
    {logout => (
      <Menu>
        <Menu.Item onClick={() => logout()}>Logout</Menu.Item>
        <Menu.Item>
          <Link href="/dashboard">Dashboard</Link>
        </Menu.Item>
      </Menu>
    )}
  </UserContext.Consumer>
);

function Dashboard() {
  return (
    <Dropdown overlay={dashboardMenu}>
      <a className="ant-dropdown-link" href="#">
        <Icon type="setting" />
      </a>
    </Dropdown>
  );
}