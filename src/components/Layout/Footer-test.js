import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

import Footer from './Footer';

describe('Footer component', () => {
    let node;

    beforeEach(() => {
        node = document.createElement('div')
    });

    afterEach(() => {
        unmountComponentAtNode(node)
    });

    it('displays copyright notice', () => {
        render(<Footer/>, node, () => {
            expect(node.textContent).toContain('Copyright')
        })
    });
});
