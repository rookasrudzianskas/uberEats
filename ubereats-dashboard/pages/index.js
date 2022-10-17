import Head from 'next/head'
import '../styles/Home.module.css';
import Orders from "../components/Orders";
import {Layout, Image} from 'antd';
import OrderDetails from "./order/[orderDetails]";
import SideMenu from "../components/SideMenu";
import {useRouter} from "next/router";

const Home = () => {
    const {Sider, Content, Footer} = Layout;
    const router = useRouter();
    // console.log(router.pathname);
    // console.log(typeof router.pathname);
    // does it work?
  return (
      <>
          {router.pathname === '/' ? (
              <Orders />
          ) : router.pathname === '/order' ? (
              <div></div>
          ) : (
              <div></div>
          )}
      </>
  )
}


export default Home;
