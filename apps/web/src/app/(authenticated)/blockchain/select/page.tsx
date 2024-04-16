'use client'

import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Typography } from 'antd'
import { BlockOutlined } from '@ant-design/icons'
const { Title, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function SelectBlockchainPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [blockchains, setBlockchains] = useState([])

  useEffect(() => {
    const fetchBlockchains = async () => {
      try {
        const blockchainsFound = await Api.Blockchain.findMany()
        setBlockchains(blockchainsFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch blockchains', { variant: 'error' })
      }
    }

    fetchBlockchains()
  }, [])

  const handleSelectBlockchain = (blockchainId: string) => {
    router.push(`/portfolio/add?blockchainId=${blockchainId}`)
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Select a Blockchain</Title>
      <Paragraph>
        Choose a blockchain to manage your cryptocurrency and NFT portfolio.
      </Paragraph>
      <Row gutter={[16, 16]}>
        {blockchains?.map(blockchain => (
          <Col key={blockchain.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              actions={[
                <Button
                  type="primary"
                  onClick={() => handleSelectBlockchain(blockchain.id)}
                >
                  Select
                </Button>,
              ]}
            >
              <Card.Meta
                avatar={<BlockOutlined />}
                title={blockchain.name}
                description={`Created on ${blockchain.dateCreated}`}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </PageLayout>
  )
}
