import React from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import './style.less'

const { Header, Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu

export default class SiderDemo extends React.Component {
  state = {
    collapsed: false,
    publics: []
  }

  onCollapse = collapsed => {
    console.log(collapsed)
    this.setState({ collapsed })
  }

  getPublics = uid => {
    //  TODO 获取公众号列表
  }

  componentDidMount() {
    const uid = localStorage.getItem('uid')
    this.getPublics(uid)
  }

  render() {
    const publicList = this.state.publics.map((ele, i) => {
      // TODO 根据 publics 数据格式构造
      const { status, name, url } = ele
      const isActivated = status === 'activated'
      return (
        <div className="public">
          <img src={url} alt="img" className="logo" />
          <p>{name}</p>
          {isActivated && <span className="activated-icon" />}
        </div>
      )
    })
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
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Breadcrumb style={{ margin: '16px' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="logout">
              <span className="icon" />
              <span className="text">退出登录</span>
            </div>
          </Header>
          <Content style={{ margin: '16px' }}>
            <div className="tips">请选择要设置签到日历的公众号</div>
            <div className="publicList">{publicList}</div>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
