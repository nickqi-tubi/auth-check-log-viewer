import { Line } from '@ant-design/plots';

import styles from './Chart.module.scss';

const Chart = ({ config }) => {
  if (!config.data.length) {
    return null;
  }

  return <Line className={styles.root} {...config} />;
};

export default Chart;
