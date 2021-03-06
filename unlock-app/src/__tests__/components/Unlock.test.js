import React from 'react'
import { shallow } from 'enzyme'
import { Unlock } from '../../components/Unlock'

let config, network

describe('Unlock Component', () => {

  beforeEach(() => {
    config = {
      providers: {},
      isRequiredNetwork: () => true,
      requiredNetwork: 'dev',
    }
    network = {
      name: 4,
    }
  })

  describe('when there are no providers', () => {
    it('should show a message indicating that a provider is required', () => {
      config.providers = {}
      const component = (<Unlock network={network} config={config} path={'/'} />)
      const wrapper = shallow(component)
      expect(wrapper.find('MissingProvider')).toExist()
    })
  })

  describe('when there is at least one provider', () => {
    describe('when the current network is one of the required networks', () => {

      it('shows the router', () => {
        config.providers = {
          HTTP: {},
        }
        const component = (<Unlock network={network} config={config} path={'/'} />)
        const wrapper = shallow(component)
        expect(wrapper.find('Switch')).toExist()
      })

    })

    describe('when the current network is not in the list of required networks', () => {
      it('should show a message indicating that the network needs to be changed', () => {
        config.providers = {
          HTTP: {},
        }
        config.isRequiredNetwork = () => false
        const component = (<Unlock network={network} config={config} path={'/'} />)
        const wrapper = shallow(component)
        expect(wrapper.props().currentNetwork).toContain('Rinkeby')
        expect(wrapper.props().requiredNetwork).toContain('dev')
      })
    })
  })

})
