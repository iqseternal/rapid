
import { useAppDispatch, useAppSelector } from '@/features';
import store from '@/features';

let state = store.getState();
store.subscribe(() => {
  state = store.getState();
})

export function useHeaderMenu() {
  const doc = useAppSelector(state => state.doc);

  const menus = [
    {
      key: '#00',
      label: <>1</>,
      children: [

      ]
    }
  ]


  return {


  }
}

export function useEditMenu() {
  const doc = useAppSelector(state => state.doc);

  return {

  }
}
