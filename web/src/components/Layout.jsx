import React, { useState } from 'react';

const Layout = ({ children }) => {
    const [ clicado, setClicado ] = useState(true);
    return (
      <div> 

        <main>
          {children} {/* Renderiza a página específica dentro do layout */}
        </main>
        
      </div>
    );
  };

  
export default Layout;
  