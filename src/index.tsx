import ReactDOM from 'react-dom'
import './styles.css'
import App from './App'

declare global {
    interface Window { Ammo: any; }
}

window.Ammo = window.Ammo || {};

ReactDOM.render(<App />, document.getElementById('root'))
