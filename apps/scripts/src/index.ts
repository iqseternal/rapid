
import moment from 'moment';

const start_time = 1747017361.931454;
const end_time = 1747017363.34105;

const usage_time = 1.4095959663391113;

const printTime = (time: number) => {

  const date = moment(time * 1000);

  console.log(date.format('YYYY-MM-DD hh:mm:ss'));
}

console.log(printTime(start_time), printTime(end_time));
