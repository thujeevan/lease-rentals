import { Card, Result } from 'antd';
import React from 'react';

export default function Fallback({error, resetErrorBoundary}) {
    return (
        <div style={{paddingTop: 20, paddingRight: 20}} >
            <Card>
                <Result 
                    status="error"
                    title="Something wrong in rendering this view."
                    subTitle="Please try refreshing the page to see whether it clears the error. Please contact support if it persists."
                >
                    <pre>{error.message}</pre>
                </Result>
            </Card>
        </div>
    );
}