import Head from 'next/head'
import {Card, Descriptions, Divider, List, Button} from 'antd';
import dishes from '../assets/data/dashboard/dishes.json';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Uber Eats Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Card title={'Order Title'} style={{margin: 20}}>
            <Descriptions bordered column={{lg: 1, md: 1, sm: 1}}>
                <Descriptions.Item label={'Customer'}>Rokas Rudzianskas</Descriptions.Item>
                <Descriptions.Item label={'Customer Address'}>Address 16, Nutella Street</Descriptions.Item>
            </Descriptions>
          <Divider />
          <List dataSource={dishes} renderItem={(dishItem) => (
              <List.Item>
                    <div style={{fontWeight: 'bold'}}>{dishItem?.name || 'Loading...'} x{dishItem?.quantity || 'Loading...'}</div>
                    <div>${dishItem?.price || 'Loading...'}</div>
              </List.Item>
          )} />
      </Card>
    </div>
  )
}
