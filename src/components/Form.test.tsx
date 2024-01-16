
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Importing Jest DOM extension

import Form from './Form';

describe('Form component', () => {
  test('renders form without errors', () => {
    render(<Form navigate={() => {}} />);
  });
});
