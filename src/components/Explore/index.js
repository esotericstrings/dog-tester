import React, { useState, useEffect } from "react";
import BarChart from '../BarChart';
import './index.scss';
import * as d3 from 'd3';
import labels from '../../data/labels.csv';
import { Table } from 'antd';
import Layout from '../Layout';

function Explore(props) {
  const [data, setData] = useState(0);
  const [keys, setKeys] = useState(1);
  const [counts, setCounts] = useState(2);
  const [loading, setLoading] = useState(true);
  document.title = "Explore Data"

  useEffect(() => {
    d3.csv(labels).then((d) => {
      // console.log(d)
      let keyArray = [];
      let countArray = [];
      var gfg = d3.rollups(d, g => g.length, data => data.breed);
      var groupBy = [];
      for (var i=0; i < gfg.length; i++) {
        var obj = {};
        obj['name'] = gfg[i][0];
        obj['count'] = gfg[i][1];
        keyArray.push(gfg[i][0]);
        countArray.push(gfg[i][1]);
        groupBy.push(obj);
      }
      setKeys(keyArray);
      setData(groupBy);
      setCounts(countArray)
      setLoading(false);
    });
    return () => undefined;
  }, []);

  const columns = [
    {
      title: 'Dog Breeds',
      dataIndex: 'name',
      sorter: (a, b) =>  a.name.localeCompare(b.name),
      defaultSortOrder: 'descend'
    },
    {
      title: 'Count',
      dataIndex: 'count',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.count - b.count,
    },
  ];

  function onChange(pagination, sorter, extra) {
    console.log('params', pagination, sorter, extra);
  }

  return (
    <Layout>
      <main className='explore'>
        <h1>Explore Training Data</h1>
          {loading && <div>loading</div>}
          {!loading && 
            <>
              <BarChart data={counts} labels={keys}/>
              <Table pagination= { {pageSizeOptions: ['10', '50', '100', '200'], showSizeChanger: true}} columns={columns} dataSource={data} onChange={onChange} />
            </>
          }
	    </main>
    </Layout>
  );
}

export default Explore