console.log('TEEKA');
import { render } from 'react-dom';
import { External } from './external';
import { Internal } from './internal';

// import './index.scss';

console.log('DUDE');

render(
  <>
    {/* <Internal></Internal> */}
    <External></External>
  </>,
  document.getElementById('windows')
);
