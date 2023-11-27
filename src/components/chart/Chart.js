import { Area } from '@ant-design/plots';

import styles from './Chart.module.scss';

const Chart = ({ config }) => {
  if (!config.data.length) {
    return null;
  }

  return <Area className={styles.root} {...config} />;
};

export default Chart;
