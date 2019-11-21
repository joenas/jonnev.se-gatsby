import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Helmet from "react-helmet";

import { Tags } from "@tryghost/helpers-gatsby";

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
                            <i className="fa fa-fw fa-tags"></i>{" "}
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
                {/* TODO: disqus */}
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
            tags: PropTypes.array
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
