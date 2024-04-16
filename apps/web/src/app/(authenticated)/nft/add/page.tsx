'use client'

import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Select, Typography } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AddNFTPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [blockchains, setBlockchains] = useState([])
  const [form] = Form.useForm()

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

  const onFinish = async (values: any) => {
    try {
      const nftCreated = await Api.Nft.createOneByBlockchainId(
        values.blockchainId,
        {
          name: values.name,
          tokenId: values.tokenId,
          blockchainId: values.blockchainId,
        },
      )
      enqueueSnackbar('NFT added successfully', { variant: 'success' })
      router.push(`/portfolio/${userId}`) // Navigate to the user's portfolio overview page
    } catch (error) {
      enqueueSnackbar('Failed to add NFT', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Add New NFT</Title>
      <Text>
        Add a new NFT to your portfolio by specifying the NFT details and
        selecting the associated blockchain.
      </Text>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="name"
          label="NFT Name"
          rules={[{ required: true, message: 'Please input the NFT name!' }]}
        >
          <Input placeholder="Enter NFT name" />
        </Form.Item>
        <Form.Item
          name="tokenId"
          label="Token ID"
          rules={[{ required: true, message: 'Please input the token ID!' }]}
        >
          <Input placeholder="Enter token ID" />
        </Form.Item>
        <Form.Item
          name="blockchainId"
          label="Blockchain"
          rules={[{ required: true, message: 'Please select a blockchain!' }]}
        >
          <Select placeholder="Select a blockchain" allowClear>
            {blockchains?.map((blockchain: any) => (
              <Option key={blockchain.id} value={blockchain.id}>
                {blockchain.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<PlusCircleOutlined />}
          >
            Add NFT
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}
