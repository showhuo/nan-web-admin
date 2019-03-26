import React from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'

const { Header, Content, Footer, Sider } = Layout
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
    }
    render() {
      return (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="user" />
                    <span>营销玩法</span>
                  </span>
                }
              >
                <Menu.Item key="3">抽奖类</Menu.Item>
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
                <Menu.Item key="6">日历签到</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <WrappedComponent />
        </Layout>
      )
    }
  }
}
