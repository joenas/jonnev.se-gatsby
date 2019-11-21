import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import { Disqus } from "gatsby-plugin-disqus";
import { Tags } from "@tryghost/helpers-gatsby";

import config from "../utils/siteConfig";

import { Layout } from "../components/common";
import { MetaData } from "../components/common/meta";

/**
 * Single post view (/:slug)
 *
 * This file renders a single post and loads all the content.
 *
 */
const Post = ({ data, location }) => {
    const post = data.ghostPost;
    let disqusConfig = {
        url: `${config.siteUrl + location.pathname}`,
        identifier: `ghost-${post.comment_id}`,
        title: post.title
    };

    return (
        <>
            <MetaData data={data} location={location} type="article" />
            <Helmet>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
            </Helmet>
            <Layout>
                <article className="content">
                    <header>
                        <h2 className="post-title">{post.title}</h2>
                        <div className="post-meta">
                            <time dateTime={post.updated_at_pretty}>
                                {post.updated_at_pretty}
                            </time>
                        </div>
                    </header>

                    {/* The main post content */}
                    <section
                        className="post-content"
                        dangerouslySetInnerHTML={{ __html: post.html }}
                    />
                    {post.tags && (
                        <div className="post-meta tags">
                            <Tags
                                post={post}
                                visibility="public"
                                autolink={true}
                                permalink="/tag/:slug"
                                separator=", "
                            />
                        </div>
                    )}
                </article>
                <hr />
                <Disqus config={disqusConfig} />
            </Layout>
        </>
    );
};

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
            updated_at_pretty: PropTypes.string.isRequired,
            tags: PropTypes.array,
            comment_id: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    location: PropTypes.object.isRequired
};

export default Post;

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
        }
    }
`;
