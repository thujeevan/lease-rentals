import React from 'react';
import {List, PageHeader} from 'antd';
import {useFetchLeases} from 'hooks/useLease';
import './Leases.css';

export default function Leases({setCurrentLease}) {
    const { status, data } = useFetchLeases();
    const handleSelect = (lease) => (e) => {
        setCurrentLease(lease);
    }

    return (
        <PageHeader title="Current Leases">
            <List 
                loading={(status === 'loading')}
                bordered
                dataSource={data}
                renderItem={(lease) => (
                    <List.Item onClick={handleSelect(lease)} key={lease.id}>
                        {lease.tenant}
                    </List.Item>
                )}
            />
        </PageHeader>
    );
}