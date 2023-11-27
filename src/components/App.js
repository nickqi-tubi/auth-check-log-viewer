import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { useState } from 'react';

import styles from './App.module.scss';

const App = () => {
  const [logJsons, setLogJsons] = useState([]);

  const uploadProps = {
    accept: '.log',

    beforeUpload: (file) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        setLogJsons(
          e.target.result
            .split('\n')
            .map((line) => {
              try {
                return JSON.parse(line);
              } catch (e) {
                return null;
              }
            })
            .filter(Boolean),
        );
      };

      reader.readAsText(file);

      // Prevent upload
      return false;
    },

    showUploadList: false,
  };

  return (
    <div className={styles.root}>
      <h1>Log Viewer</h1>
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </div>
  );
};

export default App;
