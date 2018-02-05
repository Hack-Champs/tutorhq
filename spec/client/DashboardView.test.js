import React from 'react';
import DashboardView from '../../client/src/components/DashboardView.jsx';
import renderer from 'react-test-renderer';

describe('DashboardView', () => {
  it('should be defined', () => {
    expect(DashboardView).toBeDefined();
  });

  it('should render correctly', () => {
    const dashboard = shallow(<DashboardView />);
    expect(dashboard).toMatchSnapshot();
  });
});