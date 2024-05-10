import { Link } from '@umijs/max';
import { Button, Result } from 'antd';

// 404 error page
export default () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Link to="/">
        <Button type="primary">Back Home</Button>
      </Link>
    }
  />
);
