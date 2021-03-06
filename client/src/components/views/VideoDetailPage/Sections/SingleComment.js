import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';

const { Textarea } = Input;

function SingleComment(props) {

    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue] = useState("")

    const user = useSelector(state => state.user)

    const onHandleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content : CommentValue,
            writer : user.userData._id,
            postId : props.postId,
            responseTo : props.comment._id
        }

        Axios.post('/api/comment/saveComment', variables )
        .then(response => {
            if(response.data.success) {
                console.log(response.data.result)
                setCommentValue("")
                props.refreshFunction(response.data.result)
            } else {
                alert('커멘트를 저장하지 못했습니다.')
            }
        })
    }

    const actions = [
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to">답글</span>
    ]

    return (
        <div>
            <Comment 
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt />}
                content={ <p> {props.comment.content} </p> }
            />

        {OpenReply &&
            <form style={{ display: 'flex' }} onSubmit={onSubmit} >
                <textarea 
                    style={{ width: '90%',marginLeft: '40px' ,borderRadius: '5px' }}
                    onChange={onHandleChange}
                    value={CommentValue}
                    placeholder="답글을 작성해 주세요"
                />
                <br />
                <button style={{ width: '20%', height: '52px' }} onClick={onSubmit} >Submit</button>
            </form>
        }       
        </div>
    )
}

export default SingleComment
