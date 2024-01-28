import type { ReactElement } from 'react';

import Lottie from 'lottie-react';

import loader from '../../assets/loader.json';

function Loader(): ReactElement {
  return (
    <Lottie animationData={loader} />
  )
}

export default Loader
