import { Fragment } from 'react';
import { GameInstanceRenderer } from './core/components/GameInstanceRenderer';
import { Sandbox } from './games/Sandbox';

export default function App() {
  return (
    <Fragment>
      <GameInstanceRenderer instance={Sandbox}/>
    </Fragment>
  )
}
