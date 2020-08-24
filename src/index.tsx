import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { mergeStyles } from 'office-ui-fabric-react';
import Introduction from './pages/Introduction';
import { SpectrumPlot } from './components/SpectrumPlot';
import { SpectraViewer } from './components/SpectraViewer';

// Inject some global styles
mergeStyles({
  selectors: {
    ':global(body), :global(html), :global(#app)': {
      margin: 0,
      padding: 0,
      height: '100vh'
    }
  }
});

ReactDOM.render(<SpectraViewer/>, document.getElementById('app'));
