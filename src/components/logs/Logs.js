import { Col, Row, Input, Table, Select } from 'antd';
import dayjs from 'dayjs';
import Fuse from 'fuse.js';
import { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { TIMEZONES } from 'src/constants';

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

const colProps = {
  xs: 24,
  sm: 12,
  md: 10,
  lg: 8,
  xl: 6,
  xxl: 5,
};

const Logs = ({ data, timezone, setTimezone }) => {
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

  const selectProps = {
    className: styles.select,
    value: timezone,
    options: Object.values(TIMEZONES).map((timezone) => ({ label: timezone, value: timezone })),
    onChange: setTimezone,
  };

  const fuse = new Fuse(data, {
    keys: ['time', 'statusCode', 'msg'],
    threshold: 0.3,
  });

  const dataSource = (searchTerm ? fuse.search(searchTerm).map(({ item }) => item) : data).map((item) => ({
    ...item,
    time: dayjs(item.time).format('YYYY-MM-DD HH:mm:ss'),
  }));

  const tableProps = {
    className: styles.table,
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
      <Row gutter={12}>
        <Col {...colProps}>
          <Search {...searchProps} />
        </Col>
        <Col {...colProps}>
          <Select {...selectProps} />
        </Col>
      </Row>
      <Table {...tableProps} />
    </div>
  );
};

export default Logs;
