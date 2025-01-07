
import { randomRegionForInt, toNil } from '@rapid/libs';

;;(async () => {

  const p = new Promise<any>((resolve, reject) => {

    const t = randomRegionForInt(2, 2);
    if (t === 2) {
      reject({

        name: 'as'
      })

    }


  })

  const a = await toNil(p);

})();
