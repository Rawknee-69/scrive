import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import {
  Profile,
  Navbar,
  ThemeProvider,
  Footer,
  Home,
  Watch,
  Search,
  Page404,
  About,
  PolicyTerms,
  ShortcutsPopup,
  ScrollToTop,
  usePreserveScrollOnReload,
} from './index';

function App() {
  usePreserveScrollOnReload();

  return (
    <Router>
      <ThemeProvider>
        <Navbar />
        <ShortcutsPopup />
        <ScrollToTop />
        <div style={{ minHeight: '35rem' }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/watch/:animeId' element={<Watch />} />
            <Route
              path='/watch/:animeId/:animeTitle/:episodeNumber'
              element={<Watch />}
            />
            <Route path='/profile' element={<Profile />} />
            <Route path='/about' element={<About />} />
            <Route path='/privacy&policy' element={<PolicyTerms />} />
            <Route path='*' element={<Page404 />} />
          </Routes>
        </div>
        <Footer />
        <Analytics/>
        <SpeedInsights/>
      </ThemeProvider>
    </Router>
  );
}

export default App;
