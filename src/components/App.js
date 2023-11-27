import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, Typography } from 'antd';
import { useState } from 'react';

import { parseContentToJsons } from 'src/utils';

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

  console.log('logJsons!!', logJsons);

  return (
    <div className={styles.root}>
      <Typography.Title level={1}>Log Viewer</Typography.Title>
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </div>
  );
};

export default App;
