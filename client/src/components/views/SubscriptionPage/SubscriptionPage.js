import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { FaCode } from "react-icons/fa";
import { Typography, Row, Col, Card, Icon, Avatar } from 'antd';
import Axios from 'axios';

const { Title } = Typography;
const { Meta } = Card;

function SubscriptionPage() {

    const [Video, setVideo] = useState([])

    useEffect(() => {

        const subscriptionVariables = {
            userFrom : localStorage.getItem('userId')
        }

       
        Axios.post('/api/video/getSubscriptionVideos', subscriptionVariables)
        .then(response => {
            if(response.data.success) {
                console.log(response.data.videos)
                setVideo(response.data.videos)
            } else {
                alert('비디오 가져오기를 실패 했습니다.')
            }
        })

    }, [])

    const renderCards =  Video.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor((video.duration - minutes * 60));

        return <Col lg={6} md={6} xs={24}>
        <a href={`/video/${video._id}`}>
            <div style={{ position : 'relative' }}>
                <img style={{ width : '100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
                <div className="duration">
                    <span>{minutes} : {seconds}</span>
                </div>
            </div>
        </a>
        <br />
        <Meta
            avatar={
                <Avatar src={video.writer.image} />
            } 
            title={video.title}
        />

        <span>{video.writer.name} </span><br />
        <span style={{ marginLeft : '3rem' }}>{video.views}</span> - 
        <span>{moment(video.createdAt).format("MMM Do YY")}</span>

    </Col>
        
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2} > 내가 구독한 영상 </Title>
            <hr />
            <Row gutter={[32, 16]}>

                {renderCards}

                

            </Row>         
            

        </div>
    )

}

export default SubscriptionPage
