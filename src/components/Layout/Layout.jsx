import PropTypes from 'prop-types';
import css from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={css.container}>
      {children}
    </div>
  );
}
Layout.propTypes = { children: PropTypes.node.isRequired, };