import dayjs from 'dayjs';
import _ from 'lodash';

import dayjsRounding from './dayjsRounding';

dayjs.extend(dayjsRounding);

export const parseContentToJsons = (content) =>
  content
    .split('\n')
    .map((line) => {
      try {
        return JSON.parse(line);
      } catch (e) {
        return null;
      }
    })
    .filter(Boolean);

const STATUS_CODE_REGEX = /status code (\d{3})/i;

export const parseStatusCode = (json) => {
  const { err } = json;

  if (!err) {
    return '200';
  }

  const match = STATUS_CODE_REGEX.exec(err.message);
  if (match) {
    return match[1];
  }

  return 'unknown';
};

export const getChartConfig = (logJsons) => {
  const data = logJsons
    .map((json) => {
      const statusCode = parseStatusCode(json);

      return {
        statusCode,
        time: dayjs(json.time).round(10, 'seconds').format('YYYY-MM-DD HH:mm:ss'),
      };
    })
    .reduce((acc, curr) => {
      const item = _.find(acc, _.pick(curr, ['time', 'statusCode']));
      if (item) {
        item.count++;
      } else {
        acc.push({
          ...curr,
          count: 1,
        });
      }
      return acc;
    }, []);

  const config = {
    data,
    xField: 'time',
    yField: 'count',
    seriesField: 'statusCode',
    height: 500,
    isPercent: true,
    xAxis: {
      label: {
        formatter: (value) => dayjs(value).format('HH:mm:ss'),
      },
    },
    yAxis: {
      label: {
        formatter: (value) => `${100 * value}%`,
      },
    },
    smooth: true,
  };

  console.log('config!!', config);
  return config;
};
