import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const Pagination = ({ pageContext }) => {
    const {
        previousPagePath,
        nextPagePath,
        humanPageNumber,
        numberOfPages
    } = pageContext;

    return (
        <nav className="pagination" role="navigation">
            <div>
                {previousPagePath && (
                    <Link to={previousPagePath} rel="prev">
                        Newer
                    </Link>
                )}
            </div>
            {false && numberOfPages > 1 && (
                <div className="pagination-location">
                    Page {humanPageNumber} of {numberOfPages}
                </div>
            )}
            <div>
                {nextPagePath && (
                    <Link to={nextPagePath} rel="next">
                        Older{" "}
                    </Link>
                )}
            </div>
        </nav>
    );
};

Pagination.propTypes = {
    pageContext: PropTypes.object.isRequired
};

export default Pagination;
