import { Link } from '@umijs/max';
import { Button, Result } from 'antd';

// 403 error page
export default () => (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Link to="/">
        <Button type="primary">Back to home</Button>
      </Link>
    }
  />
);
