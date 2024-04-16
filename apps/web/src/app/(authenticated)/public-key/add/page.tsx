'use client'

import React, { useState } from 'react'
import { Button, Form, Input, Select, Typography, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
const { Title, Paragraph } = Typography
const { Dragger } = Upload
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AddPublicKeyPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id

  const [blockchainId, setBlockchainId] = useState<string>('')

  const handleBlockchainChange = (value: string) => {
    setBlockchainId(value)
  }

  const handleUpload = async (options: any) => {
    const { file } = options
    const url = await Api.Upload.upload(file)
    return url // Assuming this URL will be used to associate with the publicKey somehow
  }

  const onFinish = async (values: any) => {
    try {
      const { publicKey } = values
      await Api.PublicKey.createOneByUserId(userId!, {
        publicKey,
        blockchainId,
      })
      enqueueSnackbar('Public key added successfully', { variant: 'success' })
      router.push('/portfolio/add') // Redirect to AddPortfolioPage as an example
    } catch (error) {
      enqueueSnackbar('Failed to add public key', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Add Public Key</Title>
      <Paragraph>
        Add a new public key to your account to manage your cryptocurrency and
        NFT portfolio.
      </Paragraph>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="publicKey"
          label="Public Key"
          rules={[{ required: true, message: 'Please input your public key!' }]}
        >
          <Input placeholder="Enter your public key" />
        </Form.Item>
        <Form.Item
          name="blockchain"
          label="Blockchain"
          rules={[{ required: true, message: 'Please select a blockchain!' }]}
        >
          <Select
            onChange={handleBlockchainChange}
            placeholder="Select a blockchain"
          >
            {/* Placeholder options, assuming the blockchains are fetched or predefined */}
            <Select.Option value="blockchain1">Blockchain 1</Select.Option>
            <Select.Option value="blockchain2">Blockchain 2</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Upload File (Optional)">
          <Dragger customRequest={handleUpload} maxCount={1}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Dragger>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Public Key
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}
