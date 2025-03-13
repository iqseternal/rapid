import { IS_DEV, IS_PROD } from './constants';

function dev() {

  console.log('dev');
}


function prod() {
  console.log('prod');
}


function main() {


  if (IS_PROD) dev();
  else {
    prod();
  }
}


main();
