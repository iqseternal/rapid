import { useEffect, useState } from 'react';

const App = () => {

  const [state] = useState({

  })

  useEffect(() => {

    console.log(state);

  }, [])

  return <div>


    Hello World
  </div>
}

let a = 1, b = 2;
