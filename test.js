const dayjs = require('dayjs');
const timezone = require('dayjs/plugin/timezone');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);
dayjs.extend(timezone);

const now = dayjs();

console.log({
  local: now.format('YYYY-MM-DD HH:mm:ss'),
  utc: now.utc().format('YYYY-MM-DD HH:mm:ss'),
  america: now.tz('America/Los_Angeles').format('YYYY-MM-DD HH:mm:ss'),
});
