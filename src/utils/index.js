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
  const data = logJsons.map((json) => {
    const statusCode = parseStatusCode(json);

    return {
      statusCode,
      time: json.time,
      count: 1,
    };
  });

  const config = {
    data,
    xField: 'time',
    yField: 'count',
    smooth: true,
    seriesField: 'statusCode',
  };

  return config;
};
