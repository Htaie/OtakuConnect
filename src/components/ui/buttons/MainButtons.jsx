import cn from 'classnames';
import PropTypes from 'prop-types';

const MainButtons = ({ onClick, children, className }) => {
  const buttonClassName = cn(
    'text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none',
    'focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-20 py-2.5 text-center me-2 mb-2'
  );

  return (
    <button className={buttonClassName} onClick={onClick}>
      {children}
    </button>
  );
};
MainButtons.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};
export default MainButtons;
