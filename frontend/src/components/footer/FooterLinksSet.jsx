import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const FooterLinksSet = ({ linksName, links }) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 50 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ul className="text-sm">
        <li className="font-semibold mb-3">{linksName}</li>
        {links.map((link, index) => (
          <li className="opacity-75 mb-1 font-light" key={index}>
            <Link to={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

FooterLinksSet.propTypes = {
  linksName: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FooterLinksSet;
