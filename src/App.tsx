import { AxisProvider } from './core/components/AxisProvider';
import { GameInstanceRenderer } from './core/components/GameInstanceRenderer';
import { AmmoPlayground } from './games/AmmoPlayground';

export default function App() {
  return (
    <AxisProvider>
      <GameInstanceRenderer instance={AmmoPlayground}/>
    </AxisProvider>
  );
}
