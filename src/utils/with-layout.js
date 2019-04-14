import React from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import history from '../utils/history'
import './with-layout.less'

const { Header, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu
export default function withLayout(WrappedComponent) {
  return class extends React.Component {
    state = {
      collapsed: false
    }

    onCollapse = collapsed => {
      console.log(collapsed)
      this.setState({ collapsed })
    }
    componentDidMount() {
      // TODO 获取菜单权限数据
      // TODO 检查登录状态
    }

    logout = uid => {
      // 退出登录
      history.push('/login')
    }

    getBreadcrumbs = () => {
      const { pathname } = window.location
      const breadcrumbMap = {
        'check-in': ['客群维护', '日历签到'],
        lottery: ['营销玩法', '幸运大抽奖']
      }
      for (const key in breadcrumbMap) {
        if (breadcrumbMap.hasOwnProperty(key) && pathname.includes(key)) {
          const arr = breadcrumbMap[key]
          return arr.map((ele, i) => (
            <Breadcrumb.Item key={i}>{ele}</Breadcrumb.Item>
          ))
        }
      }
    }
    render() {
      return (
        <Layout style={{ minHeight: '100vh' }} className="the-layout">
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo" />
            <Menu
              theme="dark"
              defaultSelectedKeys={['1']}
              mode="inline"
              onClick={({ key }) => {
                history.push(key)
              }}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="user" />
                    <span>营销玩法</span>
                  </span>
                }
              >
                <Menu.Item key="/lottery-home">幸运大抽奖</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="team" />
                    <span>客群维护</span>
                  </span>
                }
              >
                <Menu.Item key="/check-in-home">日历签到</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Breadcrumb style={{ margin: '2rem 3rem' }}>
                {this.getBreadcrumbs()}
              </Breadcrumb>
              <div className="logout" onClick={this.logout}>
                <span className="logout-icon" />
                <span className="logout-text">退出登录</span>
              </div>
            </Header>
            <WrappedComponent />
            <Footer style={{ textAlign: 'center' }}>
              {/* 金钻客版权所有 ©2019 */}
            </Footer>
          </Layout>
        </Layout>
      )
    }
  }
}
