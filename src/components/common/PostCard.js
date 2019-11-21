import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const PostCard = ({ post }) => {
    const url = `/${post.slug}/`;

    const { title, excerpt } = post;

    return (
        <article className="preview">
            <header>
                <h2 className="post-title">
                    <Link to={url}>{title}</Link>
                </h2>
            </header>
            <section className="post-excerpt">
                <p>{excerpt}</p>
            </section>
        </article>
    );
};

PostCard.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        featured: PropTypes.bool,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string
            })
        ),
        excerpt: PropTypes.string.isRequired,
        primary_author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            profile_image: PropTypes.string
        }).isRequired
    }).isRequired
};

export default PostCard;
