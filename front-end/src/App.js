import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Route} from 'react-router-dom'
import Layout from './components/Layout/Layout'
import SearchPage from './containers/SearchPage/SearchPage'
import FullText from './containers/FullText/FullText'

function App() {
  return (
    <BrowserRouter>
        <Layout>
          <Route path='/' exact component={SearchPage} />
          <Route path='/:drug' exact component={SearchPage} />
          <Route path='/article/:drug/:id' exact component={FullText} />
        </Layout>
    </BrowserRouter>
    
  );
}

export default App
