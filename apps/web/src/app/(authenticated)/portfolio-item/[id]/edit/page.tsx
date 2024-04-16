'use client'

import React, { useEffect, useState } from 'react'
import { Button, Form, InputNumber, Typography, Spin, message } from 'antd'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function EditPortfolioItemPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const [portfolioItem, setPortfolioItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [form] = Form.useForm()

  useEffect(() => {
    if (!userId) {
      enqueueSnackbar('You must be logged in to edit a portfolio item.', {
        variant: 'error',
      })
      router.push('/')
      return
    }

    const fetchPortfolioItem = async () => {
      try {
        const portfolioItems = await Api.PortfolioItem.findManyByPortfolioId(
          params.id,
          {
            includes: ['portfolio', 'cryptocurrency', 'nft'],
          },
        )
        if (portfolioItems.length > 0) {
          setPortfolioItem(portfolioItems[0])
          form.setFieldsValue({ quantity: portfolioItems[0].quantity })
        } else {
          enqueueSnackbar('Portfolio item not found.', { variant: 'error' })
          // Updated to redirect to a valid path
          router.push(`/portfolio/${params.id}`)
        }
      } catch (error) {
        enqueueSnackbar('Failed to fetch portfolio item.', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolioItem()
  }, [userId, params.id, router, form])

  const onFinish = async values => {
    try {
      await Api.PortfolioItem.updateOne(portfolioItem.id, {
        quantity: values.quantity,
      })
      enqueueSnackbar('Portfolio item updated successfully.', {
        variant: 'success',
      })
      // Redirect to the portfolio overview page with the correct ID
      router.push(`/portfolio/${portfolioItem.portfolioId}`)
    } catch (error) {
      enqueueSnackbar('Failed to update portfolio item.', { variant: 'error' })
    }
  }

  if (loading) {
    return <Spin tip="Loading..." />
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <Title level={2}>Edit Portfolio Item</Title>
      <Text>Edit the quantity of your cryptocurrency or NFT.</Text>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ marginTop: 20 }}
      >
        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[
            { required: true, message: 'Please input the new quantity!' },
          ]}
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
