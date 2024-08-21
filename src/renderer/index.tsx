import { createRoot } from 'react-dom/client';
import App from './App';
import GlobalContextProvider  from './context/GlobalContextProvider'
import { MemoryRouter } from 'react-router-dom';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<MemoryRouter><GlobalContextProvider><App /></GlobalContextProvider></MemoryRouter>);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
