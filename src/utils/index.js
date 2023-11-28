import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import _ from 'lodash';

import { TIMEZONES } from 'src/constants';

import dayjsRounding from './dayjsRounding';

dayjs.extend(dayjsRounding);
dayjs.extend(timezone);
dayjs.extend(utc);

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

const parseStatusCode = (json) => {
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
  const originData = logJsons.map((json) => {
    const statusCode = parseStatusCode(json);

    return {
      statusCode,
      time: dayjs(json.time).round(5, 'seconds').format('YYYY-MM-DD HH:mm:ss'),
    };
  });

  const statusCodes = _.uniq(originData.map((item) => item.statusCode));
  const times = _.uniq(originData.map((item) => item.time));

  const dataWithCount = originData.reduce((acc, curr) => {
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

  const data = times.reduce((acc, curr) => {
    statusCodes.forEach((statusCode) => {
      const item = _.find(dataWithCount, { time: curr, statusCode });
      if (item) {
        acc.push(item);
      } else {
        acc.push({
          time: curr,
          statusCode,
          count: 0,
        });
      }
    });
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
    slider: {
      trendCfg: {
        isArea: true,
      },
    },
  };

  return config;
};

export const getLogsData = (logJsons) =>
  logJsons.map((json, idx) => ({
    ...json,
    key: idx,
    statusCode: parseStatusCode(json),
  }));

export const dayjsWithTimezone = (time, timezone) => {
  const localTime = dayjs(time);

  if (timezone === TIMEZONES.LOCAL) {
    return localTime;
  }

  if (timezone === TIMEZONES.UTC) {
    return localTime.utc();
  }

  return localTime.tz(timezone);
};
