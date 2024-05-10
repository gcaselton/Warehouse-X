import { Column } from '@ant-design/plots';
import { Card, Col, DatePicker, Row, Tabs } from 'antd';
import type dayjs from 'dayjs';
import type { DataItem } from '../data.d';
import useStyles from '../style.style';

export type TimeType = 'today' | 'week' | 'month' | 'year';
const { RangePicker } = DatePicker;

/**
 * SalesCard component displays sales data using Tabs and Column charts for different categories.
 */
const SalesCard = ({
  rangePickerValue,
  salesData,
  handleRangePickerChange,
  loading
}: {
  rangePickerValue: RangePickerProps<dayjs.Dayjs>['value'];
  isActive: (key: TimeType) => string;
  salesData: DataItem[];
  loading: boolean;
  handleRangePickerChange: RangePickerProps<dayjs.Dayjs>['onChange'];
  selectDate: (key: TimeType) => void;
}) => {
  const { styles } = useStyles();
  console.log({salesData})

  // Sample data for Refunds
  const salesData1 = [
    {x:'Jan', y :123},
    {x:'Feb', y :345},
    {x:'Mar', y :576},
    {x:'Apr', y :354},
    {x:'May', y :876},
    {x:'Jun', y :512},
    {x:'July', y :256},
    {x:'Aug', y :324},
    {x:'Sep', y :876},
    {x:'Oct', y :345},
    {x:'Nov', y :999},
    {x:'Dec', y :567},
  ]

  // Sample data for Repairs
  const salesData2 = [
    {x:'Jan', y :675},
    {x:'Feb', y :357},
    {x:'Mar', y :643},
    {x:'Apr', y :875},
    {x:'May', y :635},
    {x:'Jun', y :976},
    {x:'July', y :564},
    {x:'Aug', y :956},
    {x:'Sep', y :246},
    {x:'Oct', y :765},
    {x:'Nov', y :356},
    {x:'Dec', y :765},
  ]

  // Sample data for Recycles
  const salesData3 = [
    {x:'Jan', y :674},
    {x:'Feb', y :234},
    {x:'Mar', y :555},
    {x:'Apr', y :999},
    {x:'May', y :444},
    {x:'Jun', y :222},
    {x:'July', y :1000},
    {x:'Aug', y :890},
    {x:'Sep', y :555},
    {x:'Oct', y :874},
    {x:'Nov', y :467},
    {x:'Dec', y :678},
  ]

  return (
    <Card
      loading={loading}
      bordered={false}
      bodyStyle={{
        padding: 0,
      }}
    >
      <div className={styles.salesCard}>
        <Tabs
          tabBarExtraContent={
            <div className={styles.salesExtraWrap}>
              <RangePicker
                value={rangePickerValue}
                onChange={handleRangePickerChange}
                style={{
                  width: 256,
                }}
              />
            </div>
          }
          size="large"
          tabBarStyle={{
            marginBottom: 24,
          }}
          items={[
            {
              key: 'sales',
              label: 'Refund',
              children: (
                <Row>
                  <Col xl={24} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      {/* Column chart for Refund */}
                      <Column
                        height={300}
                        data={salesData1}
                        xField="x"
                        yField="y"
                        paddingBottom={12}
                        axis={{
                          x: {
                            title: false,
                          },
                          y: {
                            title: false,
                            gridLineDash: null,
                            gridStroke: '#ccc',
                          },
                        }}
                        scale={{
                          x: { paddingInner: 0.4 },
                        }}
                        tooltip={{
                          name: 'Refunds',
                          channel: 'y',
                        }}
                      />
                    </div>
                  </Col>
                </Row>
              ),
            },
            {
              key: 'repair',
              label: 'Repair',
              children: (
                <Row>
                  <Col xl={24} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      {/* Column chart for Repair */}
                      <Column
                        height={300}
                        data={salesData2}
                        xField="x"
                        yField="y"
                        paddingBottom={12}
                        axis={{
                          x: {
                            title: false,
                          },
                          y: {
                            title: false,
                            gridLineDash: null,
                            gridStroke: '#ccc',
                          },
                        }}
                        scale={{
                          x: { paddingInner: 0.4 },
                        }}
                        tooltip={{
                          name: 'Repairs',
                          channel: 'y',
                        }}
                      />
                    </div>
                  </Col>
                </Row>
              ),
            },
            {
              key: 'recycle',
              label: 'Recycle',
              children: (
                <Row>
                  <Col xl={24} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      {/* Column chart for Recycle */}
                      <Column
                        height={300}
                        data={salesData3}
                        xField="x"
                        yField="y"
                        paddingBottom={12}
                        axis={{
                          x: {
                            title: false,
                          },
                          y: {
                            title: false,
                          },
                        }}
                        scale={{
                          x: { paddingInner: 0.4 },
                        }}
                        tooltip={{
                          name: 'Recycles',
                          channel: 'y',
                        }}
                      />
                    </div>
                  </Col>
                </Row>
              ),
            },
         
          ]}
        />
      </div>
    </Card>
  );
};
export default SalesCard;
