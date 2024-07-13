
import { useNavigate } from 'react-router-dom';


export interface HistoryInstance {

  (path: string): void;

  push(path: string): void;
  replace(path: string): void;

  go(): void;
  back(): void;
}

export function useHistory() {


  const history: HistoryInstance = function(path: string) {



  } as HistoryInstance;


  history.push = () => {

  }

  history.replace = () => {

  }



}
