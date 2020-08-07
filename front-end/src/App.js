import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Route} from 'react-router-dom'
import Layout from './components/Layout/Layout'
import SearchPage from './containers/SearchPage/SearchPage'
import FullText from './containers/FullText/FullText'
import ScrollToTop from './hoc/ScrollToTop'
import BackToTop from 'react-back-to-top-button'

function App() {
  return (
    <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Route path='/' exact component={SearchPage}/>
          <Route path='/:drug' exact component={SearchPage} />
          <Route path='/article/:drug/:id' exact component={FullText} />
          <BackToTop
              style={{backgroundColor: 'blueviolet', height:50, width:50}}
              showAt={0}
              speed={1500}
              easing="easeInOutQuint"
          >
              <span style={{color: 'white'}}>↑</span>
          </BackToTop>
        </Layout>
    </BrowserRouter>
    
  );
}

export default App
