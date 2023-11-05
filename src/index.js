import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { SidePanel } from 'polotno/side-panel';
import { Workspace } from 'polotno/canvas/workspace';

import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';

import { createStore } from 'polotno/model/store';

const store = createStore({
  key: 'nFA5H9elEytDyPyvKL7T',
  showCredit: true,
});

store.on('add', (element) => {
  if (element.type === 'text') {
    const label = prompt("Please provide a label for this text field:");
    if (label) {
      element.set({ id: label });
    }
  }
});

const App = ({ store }) => {
  const [designJSON, setDesignJSON] = useState("");
  const [loadedJSON, setLoadedJSON] = useState("");
  const [showJSON, setShowJSON] = useState(false);

  const handleSaveTemplate = () => {
    const json = store.toJSON();
    setDesignJSON(JSON.stringify(json, null, 2));
    setShowJSON(true);
  }

  const handleLoadTemplate = () => {
    try {
      const json = JSON.parse(loadedJSON);
      store.loadJSON(json);
    } catch (err) {
      alert("Failed to load template. Please ensure the JSON is valid.");
    }
  }

  return (
    <PolotnoContainer style={{ width: '100vw', height: '100vh' }}>
      <SidePanelWrap>
        <SidePanel store={store} />
      </SidePanelWrap>
      <WorkspaceWrap>
        <Toolbar store={store} downloadButtonEnabled />
        <Workspace store={store} />
        <ZoomButtons store={store} />
        <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>
          <button onClick={handleSaveTemplate}>Save as Template</button>
          <button onClick={handleLoadTemplate}>Load Template</button>
        </div>
        {showJSON && (
          <div style={{ position: 'absolute', top: '10px', left: '300px', background: 'white', padding: '10px', overflow: 'auto', maxHeight: '300px', border: '1px solid black', borderRadius: '5px' }}>
            <pre>{designJSON}</pre>
            <button onClick={() => setShowJSON(false)}>Close</button>
          </div>
        )}
        <textarea 
          value={loadedJSON}
          onChange={(e) => setLoadedJSON(e.target.value)}
          placeholder="Paste saved template JSON here"
          rows="10"
          style={{ width: '100%', marginTop: '10px' }}
        ></textarea>
      </WorkspaceWrap>
    </PolotnoContainer>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App store={store} />);