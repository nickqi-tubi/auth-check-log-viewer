import { Input, Table } from 'antd';
import dayjs from 'dayjs';
import Fuse from 'fuse.js';
import { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import styles from './Logs.module.scss';

const { Search } = Input;

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

const Logs = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!data.length) {
    return null;
  }

  const onSearch = (value) => {
    setSearchTerm(value);
  };

  const searchProps = {
    className: styles.search,
    allowClear: true,
    enterButton: true,
    onSearch,
    placeholder: 'Filter logs',
  };

  const fuse = new Fuse(data, {
    keys: ['time', 'statusCode', 'msg'],
    threshold: 0.3,
  });

  const dataSource = searchTerm ? fuse.search(searchTerm).map(({ item }) => item) : data;

  const tableProps = {
    columns,
    dataSource,
    expandable: {
      expandedRowRender: (record) => (
        <SyntaxHighlighter language="json" style={docco}>
          {JSON.stringify(record, null, 2)}
        </SyntaxHighlighter>
      ),
    },
  };

  return (
    <div className={styles.root}>
      <Search {...searchProps} />
      <Table {...tableProps} />
    </div>
  );
};

export default Logs;
