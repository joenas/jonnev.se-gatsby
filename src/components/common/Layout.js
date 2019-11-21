import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

import { Navigation } from ".";
import config from "../../utils/siteConfig";

// Styles
import "normalize.css";
import "../../styles/app.css";

import headerImage from "../../images/og-image-sm.png";

/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 */
const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
    const site = data.allGhostSettings.edges[0].node;

    return (
        <>
            <Helmet>
                <html lang={site.lang} />
                <style type="text/css">{`${site.codeinjection_styles}`}</style>
                <body className={bodyClass} />
            </Helmet>

            <main className="content">
                <nav className="menu">
                    {/* The navigation items as setup in Ghost */}
                    <Navigation data={site.navigation} />
                </nav>

                {isHome ? (
                    <header className="blog-header">
                        <img src={headerImage} width="30" height="55" />
                        <div>
                            <h1 className="blog-title">{site.title}</h1>
                            <h2 className="blog-subtitle">
                                {site.description}
                            </h2>
                        </div>
                    </header>
                ) : null}

                {/* All the section content gets inserted here, index.js, post.js */}
                {children}

                {/* The footer at the very bottom of the screen */}
                <footer className="site-foot">
                    <section className="footer-social">
                        <a
                            href="https://github.com/joenas"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="GitHub"
                        >
                            <img
                                className="site-nav-icon"
                                src="/images/icons/github.svg"
                                alt="Github"
                            />
                        </a>
                        <a
                            href="https://twitter.com/jonnever"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Twitter"
                        >
                            <img
                                className="site-nav-icon"
                                src="/images/icons/twitter.svg"
                                alt="Twitter"
                            />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/jonneverland"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="LinkedIn"
                        >
                            <img
                                className="site-nav-icon"
                                src="/images/icons/linkedin.svg"
                                alt="LinkedIn"
                            />
                        </a>
                        <a
                            href={`${config.siteUrl}/rss/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="RSS"
                        >
                            <img
                                className="site-nav-icon"
                                src="/images/icons/rss-solid.svg"
                                alt="RSS"
                            />
                        </a>
                    </section>

                    <section className="copyright">
                        &copy; 2019 {site.title}.
                    </section>
                    <section className="theme">
                        Icons -{" "}
                        <a href="https://fontawesome.com/license">
                            FontAwesome
                        </a>
                        <br />
                        Logo by{" "}
                        <a href="http://josef.sh" title="josef.sh">
                            Josef
                        </a>
                    </section>
                </footer>
            </main>
        </>
    );
};

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        file: PropTypes.object,
        allGhostSettings: PropTypes.object.isRequired
    }).isRequired
};

const DefaultLayoutSettingsQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                file(relativePath: { eq: "ghost-icon.png" }) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `}
        render={data => <DefaultLayout data={data} {...props} />}
    />
);

export default DefaultLayoutSettingsQuery;
