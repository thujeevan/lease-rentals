import React from 'react';
import {Table, PageHeader} from 'antd';
import {useFetchLease} from 'hooks/useLease';
import {generateBreakdown} from 'service/lease';

export default function Lease({lease: {id: leaseId, tenant}, setCurrentLease}) {
    const { status, data, isFetching } = useFetchLease(leaseId);

    const columns = [{
        title: 'From',
        dataIndex: 'from',
    },{
        title: 'To',
        dataIndex: 'to',
    },{
        title: 'Days',
        dataIndex: 'days',
    },{
        title: 'Amount',
        dataIndex: 'amount',
        render: (amount) => `$ ${amount}`
    }];
    
    return (
        <PageHeader 
            title={`${tenant} ${data ? `- ${data.frequency} (${data.payment_day})` : ''}`}
            onBack={() => setCurrentLease(null)}
        >
            <Table 
                size="small"
                rowKey={record => record.from + record.to}
                pagination={{pageSize: 20}}
                loading={(status === 'loading') || isFetching}
                columns={columns}
                dataSource={generateBreakdown(data)}
            />
        </PageHeader>
    )
}