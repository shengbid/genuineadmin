import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Row, Col, Button } from 'antd';
// import { useIntl, FormattedMessage } from 'umi';
import styles from './Welcome.less';
import { Chart, Line, Tooltip, Legend, Point } from 'bizcharts';

// 数据源
const data = [
  {
    time: '2-1',
    type: '1',
    value: 33,
  },
  {
    time: '2-1',
    type: '2',
    value: 133,
  },
  {
    time: '2-1',
    type: '3',
    value: 233,
  },
];

for (let i = 1; i < 8; i += 1) {
  data.push({
    time: `2-${i + 1}`,
    type: '1',
    value: Math.round(Math.random() * 50),
  });
  data.push({
    time: `2-${i + 1}`,
    type: '2',
    value: Math.round(Math.random() * 150),
  });
  data.push({
    time: `2-${i + 1}`,
    type: '3',
    value: Math.round(Math.random() * 500),
  });
}

const scale = {
  temperature: { min: 0 },
  type: {
    formatter: (v) => {
      return {
        '1': '会员流量',
        '2': '游客流量',
        '3': '整体走势',
      }[v];
    },
  },
};

const lineChart = (
  <Chart
    scale={scale}
    padding={[40, 100, 20, 40]}
    autoFit
    height={350}
    data={data}
    interactions={['element-active']}
  >
    <Line shape="smooth" position="time*value" color="type" />
    <Tooltip shared showCrosshairs />
    <Point position="time*value" color="type" shape="circle" />
    <Legend
      position="right"
      // layout='vertical'
    />
  </Chart>
);

export default (): React.ReactNode => {
  const [active, setActive] = useState(0);

  return (
    <PageContainer>
      <Row gutter={16} className={styles.cardcontanier}>
        <Col span={6}>
          <Card title="用户总数量" bordered={false}>
            <div className={styles.cardbody}>379</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card className={styles.carditem} title="总有效需求数" bordered={false}>
            <div className={styles.cardbody}>269</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="当日访问量" bordered={false}>
            <div className={styles.cardbody}>48</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="男生人数" bordered={false}>
            <div className={styles.cardbody}>33</div>
          </Card>
        </Col>
      </Row>
      <Row gutter={16} className={styles.cardcontanier}>
        <Col span={6}>
          <Card title="在线人数" bordered={false}>
            <div className={styles.cardbody}>39</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="历史需求数" bordered={false}>
            <div className={styles.cardbody}>20</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="举报数量" bordered={false}>
            <div className={styles.cardbody}>0</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="女生人数" bordered={false}>
            <div className={styles.cardbody}>15</div>
          </Card>
        </Col>
      </Row>
      <div className={styles.lineChart}>
        <div className={styles.flow}>
          <span className={styles.title}>流量走势图</span>
          <Button
            type={active === 0 ? 'primary' : 'default'}
            onClick={() => {
              setActive(0);
            }}
          >
            本月流量趋势
          </Button>
          <Button
            type={active === 1 ? 'primary' : 'default'}
            onClick={() => {
              setActive(1);
            }}
          >
            上月流量趋势
          </Button>
        </div>
        {lineChart}
      </div>
    </PageContainer>
  );
};
