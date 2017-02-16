import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

import Header from './Header';

describe('Header component', () => {
    let node;

    beforeEach(() => {
        node = document.createElement('div')
    });

    afterEach(() => {
        unmountComponentAtNode(node)
    });

    it('displays app title', () => {
        render(<Header/>, node, () => {
            expect(node.textContent).toContain('React Redux')
        })
    });
});
