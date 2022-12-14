// import '../styles/globals.css'
import 'antd/dist/antd.css';
import '../styles/index.css';
import Head from "next/head";
import {Image, Layout} from "antd";
import SideMenu from "../components/SideMenu";
import RestaurantContextProvider from "../contexts/RestaurantContext";

function MyApp({ Component, pageProps }) {
    const {Sider, Content, Footer} = Layout;
    return (
        <RestaurantContextProvider>
            <Layout>
                <Head>
                    <title>Uber Eats Dashboard</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Sider style={{height: '100vh', backgroundColor: 'white'}}>
                    <Image src={'https://logos-world.net/wp-content/uploads/2020/11/Uber-Eats-Symbol-700x394.jpg'} preview={false}/>
                    <SideMenu />
                </Sider>
                <Layout>
                    <Content style={{}}>
                        <Component {...pageProps} />
                        {/*<OrderDetails />*/}
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Uber Eats Restaurant Dashboard ©2022
                    </Footer>
                </Layout>

                {/*<Orders />*/}
            </Layout>
        </RestaurantContextProvider>
    )
}

export default MyApp


