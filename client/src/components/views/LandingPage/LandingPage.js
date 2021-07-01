import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Typography, Row, Col, Card, Icon, Avatar } from 'antd';
import Axios from 'axios';

const { Title } = Typography;
const { Meta } = Card;


function LandingPage() {

    const [Video, setVideo] = useState([])

    useEffect(() => {
       
        Axios.get('/api/video/getVideos')
        .then(response => {
            if(response.data.success) {
                console.log(response.data)
                setVideo(response.data.videos)
            } else {
                alert('비디오 가져오기를 실패 했습니다.')
            }
        })

    }, [])


    const renderCards =  Video.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor((video.duration - minutes * 60));

        return <Col lg={6} md={8} xs={24}>
            <div style={{ position : 'relative' }}>
                <a href={`/video/${video._id}`}>
                <img style={{ width : '100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
                <div className="duration">
                    <span>{minutes} : {seconds}</span>
                </div>
                </a>
            </div>
        <br />
        <Meta
            avatar={
                <Avatar src={video.writer.image} />
            } 
            title={video.title}
        />

        <span>{video.writer.name} </span><br />
        <span style={{ marginLeft : '3rem' }}>조회수 {video.views} 회</span> <br />
        <span style={{ marginLeft : '3rem'}}>{moment(video.createdAt).format("MMM Do YY")}</span>

    </Col>
        
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2} > 추천영상 </Title>
            <hr />
            <Row gutter={[32, 16]}>

                {renderCards}

                

            </Row>         
            

        </div>
    )
}

export default LandingPage
