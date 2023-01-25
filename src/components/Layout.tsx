import { Helmet, HelmetProvider } from 'react-helmet-async';
import { NavBar } from './NavBar';


const Layout = ({children, page}:any) => {

  return (
    <HelmetProvider>
      <Helmet>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <title>NativApps - Challenge {page}</title>
        <meta name="description" content="Challenge NativApps" />
        <meta property="og:title" content="Challenge NativApps" />        
        <meta property="og:description" content="Challenge NativApps - Blockbuster" />        
        <meta property="og:image" content="" />
        <meta property="og:url" content="Challenge NativApps" />
        <meta property="og:site_name" content="Blockbuster" />
        <meta property="og:locale" content="es_AR" />
        <meta property="og:type" content="article" />
      </Helmet>
      <div>
          <NavBar />
          {children}
      </div>
    </HelmetProvider>
  )
}

export default Layout