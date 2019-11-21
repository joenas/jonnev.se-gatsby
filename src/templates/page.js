import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Helmet from "react-helmet";

import { Layout } from "../components/common";
import { MetaData } from "../components/common/meta";

/**
 * Single page (/:slug)
 *
 * This file renders a single page and loads all the content.
 *
 */
const Page = ({ data, location }) => {
    const page = data.ghostPage;

    return (
        <>
            <MetaData data={data} location={location} type="website" />
            <Helmet>
                <style type="text/css">{`${page.codeinjection_styles}`}</style>
            </Helmet>
            <Layout bodyClass={page.slug}>
                <article className="content post page">
                    {page.slug === "about" && (
                        <section className="author">
                            <div
                                className="authorimage"
                                style={{
                                    background:
                                        "url(//www.gravatar.com/avatar/d1ee6ae5e315480dbb5e1f254497931a?s=250&amp;d=mm&amp;r=x)"
                                }}
                            ></div>
                            <h4 className="author-name">Jon Neverland</h4>
                        </section>
                    )}
                    <section
                        className="post-content"
                        dangerouslySetInnerHTML={{ __html: page.html }}
                    />
                </article>
            </Layout>
        </>
    );
};

Page.propTypes = {
    data: PropTypes.shape({
        ghostPage: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
            slug: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    location: PropTypes.object.isRequired
};

export default Page;

export const postQuery = graphql`
    query($slug: String!) {
        ghostPage(slug: { eq: $slug }) {
            ...GhostPageFields
        }
    }
`;
