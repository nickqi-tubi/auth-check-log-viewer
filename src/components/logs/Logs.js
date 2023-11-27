import { Table } from 'antd';
import dayjs from 'dayjs';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { parseStatusCode } from 'src/utils';

import styles from './Logs.module.scss';

const genColumn = (key, others) => ({
  key,
  dataIndex: key,
  ...others,
});

const columns = [
  genColumn('time', {
    title: 'Time',
    sorter: (a, b) => dayjs(a.time).diff(dayjs(b.time)),
  }),
  genColumn('statusCode', {
    title: 'Status Code',
  }),
  genColumn('msg', {
    title: 'Message',
  }),
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
      time: dayjs(json.time).format('YYYY-MM-DD HH:mm:ss'),
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
