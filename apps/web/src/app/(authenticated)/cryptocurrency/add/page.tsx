'use client'

import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Typography, Space } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
const { Title, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/navigation'
import { Api } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AddCryptocurrencyPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()
  const [cryptocurrencies, setCryptocurrencies] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cryptocurrenciesFound = await Api.Cryptocurrency.findMany()
        setCryptocurrencies(cryptocurrenciesFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch cryptocurrencies', {
          variant: 'error',
        })
      }
    }
    fetchData()
  }, [])

  const onFinish = async values => {
    try {
      await Api.Cryptocurrency.createOne(values)
      enqueueSnackbar('Cryptocurrency added successfully', {
        variant: 'success',
      })
      // Since the direct navigation to a specific portfolio ID isn't possible without the ID, navigate to a general page instead
      router.push('/net-worth') // Redirecting to the NetWorthSummaryPage as a sensible default
    } catch (error) {
      enqueueSnackbar('Failed to add cryptocurrency', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Space
        direction="vertical"
        size="large"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Title level={2}>Add New Cryptocurrency</Title>
        <Paragraph>
          Use the form below to add a new cryptocurrency to your portfolio.
        </Paragraph>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="symbol"
            label="Symbol"
            rules={[
              {
                required: true,
                message: 'Please input the cryptocurrency symbol!',
              },
            ]}
          >
            <Input placeholder="e.g., BTC" />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please input the cryptocurrency name!',
              },
            ]}
          >
            <Input placeholder="e.g., Bitcoin" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<PlusCircleOutlined />}
            >
              Add Cryptocurrency
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </PageLayout>
  )
}
