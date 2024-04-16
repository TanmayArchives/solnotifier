'use client'

import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Select, Typography, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
const { Title, Paragraph } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AddPortfolioItemPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [cryptocurrencies, setCryptocurrencies] = useState([])
  const [nfts, setNfts] = useState([])
  const [fileList, setFileList] = useState([])
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cryptocurrenciesFound = await Api.Cryptocurrency.findMany()
        const nftsFound = await Api.Nft.findMany()
        setCryptocurrencies(cryptocurrenciesFound)
        setNfts(nftsFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch data', { variant: 'error' })
      }
    }
    fetchData()
  }, [])

  const handleUpload = async options => {
    const { file } = options
    try {
      const url = await Api.Upload.upload(file)
      setFileList(fileList => [
        ...fileList,
        { url: url, status: 'done', name: file.name },
      ])
      enqueueSnackbar('File uploaded successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Upload failed', { variant: 'error' })
    }
  }

  const onFinish = async values => {
    try {
      const { quantity, type, assetId } = values
      const portfolioItemsFound = await Api.Portfolio.findManyByUserId(userId)
      const portfolioId = portfolioItemsFound[0]?.id
      if (type === 'cryptocurrency') {
        await Api.PortfolioItem.createOneByCryptocurrencyId(assetId, {
          quantity,
          portfolioId,
        })
      } else {
        await Api.PortfolioItem.createOneByNftId(assetId, {
          quantity,
          portfolioId,
        })
      }
      enqueueSnackbar('Portfolio item added successfully', {
        variant: 'success',
      })
      router.push(`/portfolio/${portfolioId}`)
    } catch (error) {
      enqueueSnackbar('Failed to add portfolio item', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Add to Portfolio</Title>
      <Paragraph>Add a new cryptocurrency or NFT to your portfolio.</Paragraph>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="type"
          label="Asset Type"
          rules={[{ required: true, message: 'Please select an asset type!' }]}
        >
          <Select placeholder="Select asset type">
            <Option value="cryptocurrency">Cryptocurrency</Option>
            <Option value="nft">NFT</Option>
          </Select>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.type !== currentValues.type
          }
        >
          {({ getFieldValue }) =>
            getFieldValue('type') === 'cryptocurrency' ? (
              <Form.Item
                name="assetId"
                label="Cryptocurrency"
                rules={[
                  {
                    required: true,
                    message: 'Please select a cryptocurrency!',
                  },
                ]}
              >
                <Select placeholder="Select a cryptocurrency">
                  {cryptocurrencies?.map(crypto => (
                    <Option key={crypto.id} value={crypto.id}>
                      {crypto.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            ) : getFieldValue('type') === 'nft' ? (
              <Form.Item
                name="assetId"
                label="NFT"
                rules={[{ required: true, message: 'Please select an NFT!' }]}
              >
                <Select placeholder="Select an NFT">
                  {nfts?.map(nft => (
                    <Option key={nft.id} value={nft.id}>
                      {nft.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            ) : null
          }
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[{ required: true, message: 'Please input the quantity!' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Upload Receipt (optional)">
          <Upload fileList={fileList} customRequest={handleUpload} maxCount={1}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add to Portfolio
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}
