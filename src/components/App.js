import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';

import styles from './App.module.scss';

const App = () => {
  const uploadProps = {
    name: 'file',
    onChange: (info) => {
      console.log('info!!', info);
    },
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
