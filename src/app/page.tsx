import type { NextPage } from 'next';
import Head from 'next/head';
import KalahaGame from './components/KalahaGame';


const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Kalaha Game</title>
        <meta name="description" content="A simple Kalaha game built with Next.js" />
      </Head>

      <main>
        <h1>Welcome to Kalaha Game</h1>
        <KalahaGame />
      </main>
    </div>
  );
};

export default Home;