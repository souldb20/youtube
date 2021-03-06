import React, { useState, useEffect } from 'react';
import SingleComment from './SingleComment';

function ReplyComment(props) {

    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)

    useEffect(() => {

        let commentNumber = 0;

        props.commentLists.map((comment) => {

            if(comment.responseTo === props.parentCommentId) {
                commentNumber ++
            }
        })

        setChildCommentNumber(commentNumber)

    }, [props.commentLists, props.parentCommentId])

    const renderReplyComment = (parentCommentId) => 

        props.commentLists.map((comment, index) => (
            <React.Fragment>
            {
                comment.responseTo === parentCommentId &&
                <div style={{ width: '90%', marginLeft: '40px' }}>
                    <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={props.videoId} />
                    <ReplyComment refreshFunction={props.refreshFunction} commentLists={props.commentLists} postId={props.videoId} parentCommentId={comment._id} />
                </div>
            }               
            </React.Fragment>
        ))
    

    const onHandleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
        console.log(OpenReplyComments)
    }

    return (
        <div>

            {ChildCommentNumber > 0 &&
                <p style={{ fontSize: '14px', margin: 0, color: 'gray' }} onClick={onHandleChange} >
                댓글 {ChildCommentNumber}개 더보기 
                </p>
            }
            
            {OpenReplyComments &&
                renderReplyComment(props.parentCommentId)
            }

        </div>
    )
}

export default ReplyComment
