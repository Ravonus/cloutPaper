import { External } from './external';
import { Internal } from './internal';
import { FC } from 'react';

// import './index.scss';
interface AppProps {}

export const App: FC<AppProps> = () => {
  return (
    <>
      {/* <Internal></Internal> */}
      <External></External>
    </>
  );
};

export default App;
