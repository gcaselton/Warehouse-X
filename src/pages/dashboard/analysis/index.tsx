import { GridContent } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Row } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import type dayjs from 'dayjs';
import type { FC } from 'react';
import { Suspense, useState } from 'react';
import IntroduceRow from './components/IntroduceRow';
import PageLoading from './components/PageLoading';
import type { TimeType } from './components/SalesCard';
import SalesCard from './components/SalesCard';
import type { AnalysisData } from './data.d';
import { sampleData } from './service';
import useStyles from './style.style';
import { getTimeDistance } from './utils/utils';

type RangePickerValue = RangePickerProps<dayjs.Dayjs>['value'];

type AnalysisProps = {
  dashboardAndanalysis: AnalysisData;
  loading: boolean;
};

/**
 * Analysis component for displaying analysis data and charts.
 */
const Analysis: FC<AnalysisProps> = () => {
  const { styles } = useStyles();
  const [rangePickerValue, setRangePickerValue] = useState<RangePickerValue>(
    getTimeDistance('year'),
  );
  const { loading, data } = useRequest(sampleData);

  /**
   * Selects the date based on the specified type.
   * @param type TimeType: 'today', 'week', 'month', or 'year'
   */
  const selectDate = (type: TimeType) => {
    setRangePickerValue(getTimeDistance(type));
  };

  /**
   * Handles range picker change event.
   * @param value RangePickerValue
   */
  const handleRangePickerChange = (value: RangePickerValue) => {
    setRangePickerValue(value);
  };

  /**
   * Checks if a time type is active.
   * @param type TimeType: 'today', 'week', 'month', or 'year'
   * @returns Active styles if the time type is currently active, empty string otherwise
   */
  const isActive = (type: TimeType) => {
    if (!rangePickerValue) {
      return '';
    }
    const value = getTimeDistance(type);
    if (!value) {
      return '';
    }
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0] as dayjs.Dayjs, 'day') &&
      rangePickerValue[1].isSame(value[1] as dayjs.Dayjs, 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };

  return (
    <GridContent>
      <>
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow loading={loading} visitData={data?.visitData || []} />
        </Suspense>

        <Suspense fallback={null}>
          <SalesCard
            rangePickerValue={rangePickerValue}
            salesData={data?.salesData || []}
            isActive={isActive}
            handleRangePickerChange={handleRangePickerChange}
            loading={loading}
            selectDate={selectDate}
          />
        </Suspense>

        <Row
          gutter={24}
          style={{
            marginTop: 24,
          }}
        >
        </Row>
      </>
    </GridContent>
  );
};

export default Analysis;
