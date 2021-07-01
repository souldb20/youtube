import React, { useState, useEffect } from 'react'
import { Row, Col, List, Avatar } from 'antd';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';
import Ratio from 'react-ratio';

function VideoDetailPage(props) {

    const videoId = props.match.params.videoId

    const [VideoDetail, setVideoDetail] = useState([])
    const [Comments, setComments] = useState([])

    const variable = { videoId: videoId }


    useEffect(() => {
        
        Axios.post('/api/video/getVideoDetail', variable)
        .then(response => {
            if (response.data.success) {
                setVideoDetail(response.data.VideoDetail)
            } else {
                alert('비디오 정보를 가져오길 실패했습니다.')
            }
        })

        Axios.post('/api/comment/getComments', variable)
        .then(response => {
            if (response.data.success) {
                setComments(response.data.comments)
                console.log(response.data.comments)
            } else {
                alert('코멘트 정보를 가져오는데 실패했습니다.')
            }
        })

    }, [props])


    const refreshFunction = (newComment) => {
        setComments(Comments.concat(newComment))
    }


    if(VideoDetail.writer) {

        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={VideoDetail.writer._id } userFrom={localStorage.getItem('userId')} />

        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24} >
                
                    <div style={{ width: '100%', padding: '3rem 4em' }}>
                        <Ratio ratio={ 16/9 }>
                            <video style={{ width: '100%', height: '100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls autoPlay></video>
                        </Ratio>
                        
    
                        <List.Item
                            actions={[ subscribeButton ]}
                        >
                            <List.Item.Meta 
                                avatar={<Avatar src={VideoDetail.writer.image} />}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                                />
    
                        </List.Item>
    
                        <Comment refreshFunction={refreshFunction} commentLists={Comments} postId={videoId} />
    
                    </div>
    
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
        )
    } else {
        return (
            <div>
                ...Lodaing...
            </div>
        )
    }

    
}

export default VideoDetailPage
