import React from "react";
import { Card, Col, Row, Statistic } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getProxyAnalytics } from "../../services/proxy.service";
import { Chart } from "react-google-charts";

const Analytics: React.FC = () => {
  const { data: analyticsResponse } = useQuery({
    queryFn: getProxyAnalytics,
    queryKey: ["proxyAnalytisc"],
  });

  const data = analyticsResponse?.data;
  const chartData = (data?.regionCounts || [])?.map((regionCount: any) => {
    return [regionCount._id, regionCount.total];
  });

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card bordered={false}>
          <Statistic
            title="Active"
            value={data?.totalCount}
            valueStyle={{ color: "#164cff" }}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false}>
          <Statistic
            title="Live"
            value={data?.liveCount}
            valueStyle={{ color: "#3f8600" }}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false}>
          <Statistic
            title="Die"
            value={data?.dieCount}
            valueStyle={{ color: "#cf1322" }}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false}>
          {(data?.regionCounts || [])?.map((count: any) => (
            <p>
              {count._id}: {count.total}
            </p>
          ))}
        </Card>
      </Col>
    </Row>
  );
};

export default Analytics;
