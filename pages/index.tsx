import type { NextPage } from 'next';
import Head from 'next/head';
import HomeIndexPage from '../components/home';
import Navbar from '../components/layout/navbar/navbar';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
      {/* <Navbar/> */}
      <HomeIndexPage/>
      </main>
    </div>
  )
}

export default Home
