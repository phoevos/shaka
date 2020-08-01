import React from 'react';
import Layout from './components/Layout/Layout'
import SearchPage from './containers/SearchPage/SearchPage'

function App() {
  return (
    <div>
      <Layout>
        <SearchPage/>
      </Layout>
    </div>
  );
}

export default App;
