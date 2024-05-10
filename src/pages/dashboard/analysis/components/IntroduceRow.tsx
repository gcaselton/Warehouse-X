import { InfoCircleOutlined } from '@ant-design/icons';
import { Area, Column } from '@ant-design/plots';
import { Col, Row, Tooltip } from 'antd';
import numeral from 'numeral';
import type { DataItem } from '../data.d';
import useStyles from '../style.style';
import { ChartCard } from './Charts';
import Trend from './Trend';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: {
    marginBottom: 24,
  },
};

/**
 * IntroduceRow component displays multiple ChartCard components in a Row layout.
 * Each ChartCard represents different statistics with tooltips for additional information.
 */
const IntroduceRow = ({ loading, visitData }: { loading: boolean; visitData: DataItem[] }) => {
  const { styles } = useStyles();

  return (
    <Row gutter={24}>
      {/* Total Returns ChartCard */}
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title="Total Returns"
          action={
            <Tooltip title="Total number of returned items in the warehouse">
              <InfoCircleOutlined />
            </Tooltip>
          }
          loading={loading}
          total={() => 25637}
          contentHeight={46}
        >
          {/* Trend components within ChartCard */}
          <Trend
            flag="up"
            style={{
              marginRight: 16,
            }}
          >
            week
            <span className={styles.trendText}>12%</span>
          </Trend>
          <Trend flag="down">
            day
            <span className={styles.trendText}>11%</span>
          </Trend>
        </ChartCard>
      </Col>

      {/* Refund ChartCard */}
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="Refund"
          action={
            <Tooltip title="Total items being processed for refund">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={numeral(8846).format('0,0')}
          contentHeight={46}
        >
          {/* Area chart within ChartCard */}
          <Area
            xField="x"
            yField="y"
            shapeField="smooth"
            height={46}
            axis={false}
            style={{
              fill: 'linear-gradient(-90deg, white 0%, #975FE4 100%)',
              fillOpacity: 0.6,
              width: '100%',
            }}
            padding={-20}
            data={visitData}
          />
        </ChartCard>
      </Col>

      {/* Repair ChartCard */}
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="Repair"
          action={
            <Tooltip title="Total items being processed for repairs">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={numeral(6560).format('0,0')}
          contentHeight={46}
        >
          {/* Column chart within ChartCard */}
          <Column
            xField="x"
            yField="y"
            padding={-20}
            axis={false}
            height={46}
            data={visitData}
            scale={{ x: { paddingInner: 0.4 } }}
          />
        </ChartCard>
      </Col>

      {/* Recycle ChartCard */}
      <Col {...topColResponsiveProps}>
        <ChartCard
          loading={loading}
          bordered={false}
          title="Recycle"
          action={
            <Tooltip title="Total items being processed for recycling">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total="10231"
          contentHeight={46}
        >
          {/* Trend components within ChartCard */}
          <Trend
            flag="up"
            style={{
              marginRight: 16,
            }}
          >
            week
            <span className={styles.trendText}>12%</span>
          </Trend>
          <Trend flag="down">
            day
            <span className={styles.trendText}>11%</span>
          </Trend>
        </ChartCard>
      </Col>
    </Row>
  );
};

export default IntroduceRow;
