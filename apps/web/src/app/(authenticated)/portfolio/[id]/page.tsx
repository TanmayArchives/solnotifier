'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Row, Col, Card, Avatar } from 'antd'
import { DollarCircleOutlined, WalletOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function PortfolioOverviewPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [portfolios, setPortfolios] = useState([])

  useEffect(() => {
    if (!userId) {
      enqueueSnackbar('User not found, please login.', { variant: 'error' })
      return
    }

    const fetchPortfolios = async () => {
      try {
        const portfoliosFound = await Api.Portfolio.findManyByUserId(userId, {
          includes: [
            'portfolioItems',
            'portfolioItems.cryptocurrency',
            'portfolioItems.nft',
          ],
        })
        setPortfolios(portfoliosFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch portfolios.', { variant: 'error' })
      }
    }

    fetchPortfolios()
  }, [userId])

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Portfolio Overview</Title>
      <Text>
        View a detailed overview of your cryptocurrency and NFT portfolio,
        including net worth and individual assets.
      </Text>
      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        {portfolios.map(portfolio => (
          <Col span={24} md={12} lg={8} key={portfolio.id}>
            <Card
              actions={[
                <DollarCircleOutlined
                  key="netWorth"
                  onClick={() => router.push(`/net-worth`)}
                />,
                <WalletOutlined
                  key="edit"
                  onClick={() => router.push(`/portfolio/${portfolio.id}`)}
                />,
              ]}
            >
              <Card.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={`Portfolio - ${dayjs(portfolio.dateCreated).format('DD/MM/YYYY')}`}
                description={`Net Worth: $${portfolio.netWorth}`}
              />
              <div style={{ marginTop: '20px' }}>
                {portfolio.portfolioItems?.map(item => (
                  <Row key={item.id}>
                    <Col span={12}>
                      <Text strong>
                        {item.cryptocurrency?.name || item.nft?.name}
                      </Text>
                    </Col>
                    <Col span={12}>
                      <Text>{item.quantity}</Text>
                    </Col>
                  </Row>
                ))}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </PageLayout>
  )
}
