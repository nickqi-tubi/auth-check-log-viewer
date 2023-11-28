import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, Typography } from 'antd';
import { useState } from 'react';

import Chart from 'src/components/chart';
import Logs from 'src/components/logs';
import { TIMEZONES } from 'src/constants';
import { parseContentToJsons, getChartConfig, getLogsData } from 'src/utils';

import styles from './App.module.scss';

const App = () => {
  const [logJsons, setLogJsons] = useState([]);
  const [timezone, setTimezone] = useState(TIMEZONES.LOCAL);

  const uploadProps = {
    accept: '.log',

    beforeUpload: (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogJsons(parseContentToJsons(e.target.result));
      };
      reader.readAsText(file);
      return false; // Prevent upload
    },

    showUploadList: false,
  };

  const logsProps = {
    data: getLogsData(logJsons),
    timezone,
    setTimezone,
  };

  return (
    <div className={styles.root}>
      <Typography.Title level={1}>Log Viewer</Typography.Title>
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>Upload Log File</Button>
      </Upload>
      <Chart config={getChartConfig({ logJsons, timezone })} />
      <Logs {...logsProps} />
    </div>
  );
};

export default App;
