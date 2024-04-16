import { RouterObject } from '@web/core/router'
import { useDesignSystem } from '@web/designSystem'
import { Model } from '@web/domain'
import { useAuthentication } from '@web/modules/authentication'
import { Col, Layout, Row } from 'antd'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { Leftbar } from './components/Leftbar'
import { Logo } from './components/Logo'
import { SubNavigation } from './components/SubNavigation'
import { Topbar } from './components/Topbar/index.layout'

interface Props {
  children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter()

  const authentication = useAuthentication()
  const user = authentication?.user as Model.User

  const { isMobile } = useDesignSystem()

  const goTo = (url: string) => {
    router.push(url)
  }

  const goToUserPage = (url: string) => {
    router.push(url.replace(':id', user?.id))
  }

  const itemsLeftbar = []

  const itemsUser = []

  const itemsTopbar = [
    {
      key: '/portfolio/add',
      label: 'Add Portfolio',
      onClick: () => goTo('/portfolio/add'),
    },

    {
      key: '/public-key/add',
      label: 'Add Public Key',
      onClick: () => goTo('/public-key/add'),
    },

    {
      key: '/blockchain/select',
      label: 'Select Blockchain',
      onClick: () => goTo('/blockchain/select'),
    },

    {
      key: '/portfolio-item/add',
      label: 'Add Portfolio Item',
      onClick: () => goTo('/portfolio-item/add'),
    },

    {
      key: '/net-worth',
      label: 'Net Worth',
      onClick: () => goTo('/net-worth'),
    },

    {
      key: '/cryptocurrency/add',
      label: 'Add Cryptocurrency',
      onClick: () => goTo('/cryptocurrency/add'),
    },

    {
      key: '/nft/add',
      label: 'Add NFT',
      onClick: () => goTo('/nft/add'),
    },
  ]

  const itemsSubNavigation = [
    {
      key: '/portfolio/add',
      label: 'Add Portfolio',
    },

    {
      key: '/portfolio/:id',
      label: 'Portfolio Overview',
    },

    {
      key: '/public-key/add',
      label: 'Add Public Key',
    },

    {
      key: '/blockchain/select',
      label: 'Select Blockchain',
    },

    {
      key: '/portfolio-item/add',
      label: 'Add Portfolio Item',
    },

    {
      key: '/portfolio-item/:id/edit',
      label: 'Edit Portfolio Item',
    },

    {
      key: '/net-worth',
      label: 'Net Worth',
    },

    {
      key: '/cryptocurrency/add',
      label: 'Add Cryptocurrency',
    },

    {
      key: '/nft/add',
      label: 'Add NFT',
    },
  ]

  const itemsMobile = [
    {
      key: 'profile',
      label: 'Profile',
      onClick: () => goTo(RouterObject.route.PROFILE),
    },
    {
      key: 'notifications',
      label: 'Notifications',
      onClick: () => goTo(RouterObject.route.NOTIFICATIONS),
    },
    ...itemsTopbar,
    ...itemsLeftbar,
  ]

  const isLeftbar = itemsLeftbar.length > 0 && !isMobile

  return (
    <>
      <Layout>
        <Row
          style={{
            height: '100vh',
            width: '100vw',
          }}
        >
          {isLeftbar && (
            <Col>
              <Leftbar
                items={itemsLeftbar}
                itemsUser={itemsUser}
                logo={<Logo className="m-2" />}
              />
            </Col>
          )}

          <Col
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <Topbar
              isMobile={isMobile}
              items={itemsTopbar}
              itemsMobile={itemsMobile}
              logo={!isLeftbar && <Logo width={40} height={40} />}
            />

            <Col
              style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <SubNavigation items={itemsSubNavigation} />

              {children}
            </Col>
          </Col>
        </Row>
      </Layout>
    </>
  )
}
