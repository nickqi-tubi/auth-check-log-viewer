import { Table } from 'antd';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { parseStatusCode } from 'src/utils';

import styles from './Logs.module.scss';

const columns = [
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Status Code',
    dataIndex: 'statusCode',
    key: 'statusCode',
  },
  {
    title: 'Message',
    dataIndex: 'msg',
    key: 'msg',
  },
];

const Logs = ({ logJsons }) => {
  if (!logJsons.length) {
    return null;
  }

  const props = {
    className: styles.root,
    columns,
    dataSource: logJsons.map((json, idx) => ({
      ...json,
      key: idx,
      statusCode: parseStatusCode(json),
    })),
    expandable: {
      expandedRowRender: (record) => (
        <SyntaxHighlighter language="json" style={docco}>
          {JSON.stringify(record, null, 2)}
        </SyntaxHighlighter>
      ),
    },
  };

  return <Table {...props} />;
};

export default Logs;
