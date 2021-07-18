import { GameInstanceRenderer } from './core/components/GameInstanceRenderer';
import { AmmoPlayground } from './games/AmmoPlayground';

export default function App() {
  return <GameInstanceRenderer instance={AmmoPlayground}/>
}
