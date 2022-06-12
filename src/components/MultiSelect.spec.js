import { render, screen, fireEvent } from '@testing-library/react';
import MultiSelect from './MultiSelect';

describe('<MultiSelect />', () => {
  const defaultProps = {
    values: ['a', 'b', 'c'],
  };

  it('renders initially as expected', () => {
    const { asFragment } = render(<MultiSelect {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  describe('when the select anchor is clicked', () => {
    it('shows the options list', () => {
      render(<MultiSelect {...defaultProps} />);
      const anchor = screen.getByTestId('dropdown-anchor');
      fireEvent.click(anchor);
      expect(screen.getByTestId('options-list')).toBeInTheDocument();
    });

    describe('when closing the options list', () => {
      it('removes the options list', () => {
        render(<MultiSelect {...defaultProps} />);
        const anchor = screen.getByTestId('dropdown-anchor');
        fireEvent.click(anchor);
        fireEvent.click(anchor);
        expect(screen.queryByTestId('options-list')).not.toBeInTheDocument();
      });
    });
  });

  describe('when title is provided', () => {
    const title = 'letters';

    it('shows title', () => {
      render(<MultiSelect {...defaultProps} title={title} />);
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  describe('when label is provided', () => {
    const label = 'This shows a list of letters';

    it('shows label', () => {
      render(<MultiSelect {...defaultProps} label={label} />);
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  describe('when multiple is true', () => {
    const multiDefaultProps = {
      ...defaultProps,
      multiple: true,
    };

    it('renders as expected', () => {
      const { asFragment } = render(<MultiSelect {...multiDefaultProps} />);
      expect(asFragment()).toMatchSnapshot();
    });

    describe('clicking on select all', () => {
      it('selects all options and displays them joined in the dropdown anchor', () => {
        render(<MultiSelect {...multiDefaultProps} />);
        const anchor = screen.getByTestId('dropdown-anchor');
        fireEvent.click(anchor);
        const selectAll = screen.getByTestId('batch-action');
        fireEvent.click(selectAll);
        expect(anchor.textContent).toEqual(
          `${multiDefaultProps.values.join(', ')}▼`
        );
      });
    });
  
    describe('clicking on deselect all', () => {
      const title = 'letters';

      it('deselects all options', () => {
        render(<MultiSelect {...multiDefaultProps} title={title} />);
        const anchor = screen.getByTestId('dropdown-anchor');
        fireEvent.click(anchor);
        const selectAll = screen.getByTestId('batch-action');
        fireEvent.click(selectAll);
        fireEvent.click(selectAll);
        expect(anchor.textContent).toEqual(`${title}▼`);
      });
    });
  });

  describe('when values is an empty array', () => {
    it('no options list appears', () => {
      render(<MultiSelect values={[]} />);
      expect(screen.queryByTestId('dropdown-anchor')).not.toBeInTheDocument();
    });
  });
});
