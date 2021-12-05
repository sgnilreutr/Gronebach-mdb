import React from 'react'
import TestRenderer from 'react-test-renderer'
import MovieDetail from '../MovieDetail'

describe('movieDetail', () => {
  describe('when there is no movie', () => {
    it('renders the Loading message', () => {
      const tree = TestRenderer.create(<MovieDetail />)

      expect(tree).toMatchSnapshot()
    })
  })
})
