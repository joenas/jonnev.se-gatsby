import React from "react";
import PropTypes from "prop-types";
import config from "../../utils/siteConfig";

/**
 * Navigation component
 *
 * The Navigation component takes an array of your Ghost
 * navigation property that is fetched from the settings.
 * It differentiates between absolute (external) and relative link (internal).
 * You can pass it a custom class for your own styles, but it will always fallback
 * to a `site-nav-item` class.
 *
 */
const Navigation = ({ data }) => {
    return (
        <ul>
            {data.map((navItem, i) => {
                const navClass = `nav-${navItem.label}`;
                const url = navItem.url.replace(config.siteUrl, "") || "/";
                return (
                    <li className={navClass} key={i}>
                        <a href={url}>{navItem.label}</a>
                    </li>
                );
            })}
        </ul>
    );
};

Navigation.defaultProps = {
    navClass: `site-nav-item`
};

Navigation.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    navClass: PropTypes.string
};

export default Navigation;
