import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

import Intro from './Intro';

describe('Intro component', () => {
  let node;

  beforeEach(() => {
    node = document.createElement('div')
  });

  afterEach(() => {
    unmountComponentAtNode(node)
  });

  it('displays a welcome message', () => {
    render(<Intro/>, node, () => {
      expect(node.textContent).toContain('WelcomeThis is a starter template for setting up React with Redux, Bootstrap and Flex LayoutView All Todos')
    })
  });
});
