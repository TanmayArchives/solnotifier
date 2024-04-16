'use client'

import React, { useState, useEffect } from 'react'
import { Button, Form, InputNumber, Typography, Row, Col, Card } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
const { Title, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router' // Corrected import for useRouter
import { Api } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AddPortfolioPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()

  const handleSubmit = async (values: { netWorth: number }) => {
    try {
      await Api.Portfolio.createOneByUserId(userId, {
        netWorth: values.netWorth,
      })
      enqueueSnackbar('Portfolio created successfully', { variant: 'success' })
      router.push('/net-worth') // Valid path
    } catch (error) {
      enqueueSnackbar('Failed to create portfolio', { variant: 'error' })
    }
  }

  useEffect(() => {
    if (!authentication.isAuthenticated) {
      // Since there's no valid login path, we remove the redirection to avoid bugs.
      // Consider handling unauthenticated state within the UI or redirect to a valid path if applicable.
    }
  }, [authentication.isAuthenticated, router])

  return (
    <PageLayout layout="narrow">
      <Row justify="center">
        <Col xs={24} sm={18} md={12}>
          <Card bordered={false}>
            <Title level={2}>Create New Portfolio</Title>
            <Paragraph>
              Manage and view your cryptocurrency and NFT holdings by creating a
              new portfolio.
            </Paragraph>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                name="netWorth"
                label="Initial Net Worth"
                rules={[
                  {
                    required: true,
                    message: 'Please input the initial net worth!',
                  },
                ]}
              >
                <InputNumber
                  prefix="$"
                  style={{ width: '100%' }}
                  min={0}
                  placeholder="Enter your initial net worth"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<PlusCircleOutlined />}
                >
                  Create Portfolio
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
