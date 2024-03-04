import React from 'react';
import useSWR from 'swr';

const Comments = ({ propertyId, data }) => {
    

    // Filter comments based on propertyId
    const filteredComments = data ? data.filter(comment => comment.propertyId === propertyId) : [];

    return (
        <div className='border w-full my-3 h-36 p-5 overflow-auto'>
            {filteredComments.length > 0 ? (
                filteredComments.map(comment => (
                    <div key={comment._id}>
                        {comment.comment}
                    </div>
                ))
            ) : (
                <p>No comments found for this property.</p>
            )}
        </div>
    );
};

export default Comments;

