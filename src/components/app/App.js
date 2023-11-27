import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, Typography } from 'antd';
import { useState } from 'react';

import Chart from 'src/components/chart';
import { parseContentToJsons, getChartConfig } from 'src/utils';

import styles from './App.module.scss';

const App = () => {
  const [logJsons, setLogJsons] = useState([]);

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

  return (
    <div className={styles.root}>
      <Typography.Title level={1}>Log Viewer</Typography.Title>
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <Chart config={getChartConfig(logJsons)} />
    </div>
  );
};

export default App;
