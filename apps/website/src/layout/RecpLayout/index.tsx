
import { memo } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '@/plats/components/Footer';

const RecpLayout = memo(() => {


  return (

    <div className='w-full h-full overflow-y-auto'>
      <Outlet />

      <Footer />
    </div>
  )
})

export default RecpLayout;
