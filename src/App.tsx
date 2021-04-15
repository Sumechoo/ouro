import { Fragment } from 'react';
import { GameInstanceRenderer } from './core/components/GameInstanceRenderer';
import { Arcanoid } from './games/Arcanoid';

export default function App() {
  return (
    <Fragment>
      <GameInstanceRenderer instance={Arcanoid}/>
    </Fragment>
  )
}
