import { Fragment } from 'react';
import { GameInstanceRenderer } from './core/components/GameInstanceRenderer';
import { AmmoPlayground } from './games/AmmoPlayground';

export default function App() {
  return (
    <Fragment>
      <GameInstanceRenderer instance={AmmoPlayground}/>
    </Fragment>
  )
}
