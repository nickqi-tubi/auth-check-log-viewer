import { Line } from '@ant-design/plots';

const Chart = ({ config }) => {
  if (!config.data.length) {
    return null;
  }

  console.log('config!!', config);

  return <Line {...config} />;
};

export default Chart;
