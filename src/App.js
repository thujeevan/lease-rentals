import React from 'react';
import './App.css';

import Leases from 'components/Leases';
import Lease from 'components/Lease';
import {Card, Col, Result, Row} from 'antd';
import {ErrorBoundary} from 'react-error-boundary';
import ErrorFallback from 'components/ErrorFallback';

function App() {
  const [currentLease, setCurrentLease] = React.useState(null);
  return (
    <Row gutter={[16, 16]}>
      <Col md={{span: 6}} sm={{span: 8}} xs={{span: 24}}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Leases setCurrentLease={setCurrentLease} />
        </ErrorBoundary>
      </Col>
      <Col md={{span: 18}} sm={{span: 16}} xs={{span: 24}}>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
        >
          {(currentLease) ? (
            <Lease lease={currentLease}  setCurrentLease={setCurrentLease}/>
          ) : (
            <div style={{paddingTop: 20, paddingRight: 20}} >
              <Card>
                <Result title="Please select a lease"/>
              </Card>
            </div>
          )}
        </ErrorBoundary>
      </Col>
    </Row>
  );
}

export default App;
