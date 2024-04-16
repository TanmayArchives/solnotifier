'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Row, Col, Card, Spin, Avatar } from 'antd'
import { DollarCircleOutlined, FundOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function NetWorthSummaryPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const [loading, setLoading] = useState(true)
  const [netWorth, setNetWorth] = useState<number>(0)
  const [portfolioItems, setPortfolioItems] = useState([])

  useEffect(() => {
    if (!userId) {
      enqueueSnackbar('User not found, please login.', { variant: 'error' })
      router.push('/')
      return
    }

    const fetchPortfolio = async () => {
      try {
        const portfolios = await Api.Portfolio.findManyByUserId(userId, {
          includes: [
            'portfolioItems',
            'portfolioItems.cryptocurrency',
            'portfolioItems.nft',
          ],
        })
        const totalNetWorth = portfolios.reduce(
          (acc, portfolio) => acc + portfolio.netWorth,
          0,
        )
        const items = portfolios.flatMap(
          portfolio => portfolio.portfolioItems || [],
        )
        setNetWorth(totalNetWorth)
        setPortfolioItems(items)
      } catch (error) {
        enqueueSnackbar('Failed to fetch portfolio data.', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolio()
  }, [userId, router])

  return (
    <PageLayout layout="narrow">
      <Title level={2}>
        <DollarCircleOutlined /> Net Worth Summary
      </Title>
      <Text type="secondary">
        Overview of your cryptocurrency and NFT holdings.
      </Text>
      {loading ? (
        <Spin tip="Loading...">
          <div style={{ minHeight: '200px', margin: '20px 0' }} />
        </Spin>
      ) : (
        <>
          <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
            <Col span={24}>
              <Card>
                <Title level={4}>
                  <FundOutlined /> Total Net Worth
                </Title>
                <Text>${netWorth.toLocaleString()}</Text>
              </Card>
            </Col>
            {portfolioItems.map((item, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <Card>
                  <Card.Meta
                    avatar={
                      <Avatar
                        src={
                          item.cryptocurrency?.pictureUrl ||
                          item.nft?.pictureUrl
                        }
                      />
                    }
                    title={item.cryptocurrency?.name || item.nft?.name}
                    description={`Quantity: ${item.quantity}`}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </PageLayout>
  )
}
