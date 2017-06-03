import React from 'react';
import ReactDOM from 'react-dom';
import {
	renderIntoDocument,
	findRenderedDOMComponentWithClass,
	scryRenderedComponentsWithType
} from 'react-dom/test-utils';
import MinesweeperComponent from '../game/components/MinesweeperComponent.jsx'
import { expect } from 'chai';

before(function () {
  this.jsdom = require('jsdom-global')()
})

after(function () {
  this.jsdom()
})

describe('MinesweeperComponent', () => {
	it('should render a div with "minesweeper-table" class', () => {
    var game = {}
		const component = renderIntoDocument(
			<MinesweeperComponent game={game} statusMessage=""/>
		);
		const minesweeperComponentElement = findRenderedDOMComponentWithClass(component, 'minesweeper-table');

		expect(minesweeperComponentElement).to.be.ok;
	});
});
