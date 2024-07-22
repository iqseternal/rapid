import { makeMenu, computedSelector } from '@/menus/framework';

export const headerMenu = makeMenu([
  {
    key: '1',
    label: <>1</>,

    children: [
      {
        key: '1-1',
        label: <>1-1</>,
        disabled: computedSelector((state) => !state.doc.isWork)
      },
      {
        key: '1-2',
        label: <>1-2</>,
        children: [
          {
            key: '1-2-1',
            label: <>1-2-1</>
          }
        ]
      },
      {
        key: '1-3',
        label: <>1-3</>
      }
    ]
  }
]);
