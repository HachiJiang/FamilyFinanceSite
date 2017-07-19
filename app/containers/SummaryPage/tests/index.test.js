import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shallow } from 'enzyme';

import SummaryPage from '../index';
import messages from '../messages';

describe('<SummaryPage />', () => {
  it('should render the page message', () => {
    const renderedComponent = shallow(
      <SummaryPage />
    );
    expect(renderedComponent.contains(
      <FormattedMessage {...messages.header} />
    )).toEqual(true);
  });
});
