import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import { useSelector } from 'react-redux';

const { TextArea } = Input;
const { Title } = Typography;


const PrivateOptions = [
    {value : 0, label : "Public" },
    {value : 1, label : "Private" }
]

const CategoryOptions = [
    {value : 0, label : "Film & Animation"},
    {value : 0, label : "Auto & Vehicles"},
    {value : 0, label : "Music"},
    {value : 0, label : "Pets & Animals"},
    {value : 0, label : "Eating"},
    {value : 0, label : "Games"},
    {value : 0, label : "Etc"}
]

function VideoUploadPage(props) {

    const user = useSelector(state => state.user);

    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("Film & Animation")
    const [FilePath, setFilePath] = useState("")
    const [Duration, setDuration] = useState("")
    const [ThumbnailPath, setThumbnailPath] = useState("")

    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value)
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }

    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)
    }

    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in First')
        }

        if (VideoTitle === "" || Description === "" ||
            Category === "" || FilePath === "" ||
            Duration === "" || ThumbnailPath === "") {
            return alert('Please first fill all the fields')
        }

        const variables = {
            writer : user.userData._id,
            title : VideoTitle,
            description : Description,
            privacy : Private,
            filePath : FilePath,
            category : Category,
            duration : Duration,
            thumbnail : ThumbnailPath,

        }


        Axios.post('/api/video/uploadvideo', variables)
        .then(response => {
            if(response.data.success) {

                message.success('??????????????? ???????????? ????????????.')

                setTimeout(() => {

                }, 3000);

                props.history.push('/')

            } else {
                alert(' ????????? ???????????? ?????? ????????????.')
            }
        })
    }

    const onDrop = (files) => {
        
        let formData = new FormData;
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])

        Axios.post('/api/video/uploadfiles', formData, config)
        .then(response => {
            if(response.data.success) {
                console.log(response.data)
                
                let variable = {
                    filePath:response.data.filePath,
                    fileName: response.data.fileName
                }

                setFilePath(response.data.filePath)

                Axios.post('/api/video/thumbnail', variable)
                .then(response => {
                    if(response.data.success) {

                        setDuration(response.data.fileDuration)
                        setThumbnailPath(response.data.url)

                    } else {
                        alert('????????? ????????? ?????? ????????????.')
                    }
                })

            } else {
                alert('????????? ???????????? ??????????????????.')
            }
        })
    }

    return (
        <div style= {{ maxWidth:'700px', margin:'3rem auto' }}>
            <div style={{ textAlign:'center', marginBottom:'2rem' }}>
                <Title level={2}>Upload Video</Title>
            </div>

            <Form onSubmit={onSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Drop Zone */}

                    <Dropzone
                    onDrop={onDrop}
                    multiple={false}
                    maxSize={100000000}
                    >
                    {({getRootProps, getInputProps}) => (
                        <div style={{ width: '300px', height: '240px', border:'2px solid red', display: 'flex',alignItems:'center', justifyContent:'center'}} {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Icon type="plus" style={{ fontSize:'3rem' }} />


                        </div>
                    )} 



                    </Dropzone>

                    {/* Thumbnail */}

                    {ThumbnailPath &&
                        <div>
                            <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail" />
                        </div>
                    }


                </div>

            <br />
            <br />
            <label>??????</label>
            <Input 
                onChange={onTitleChange}
                value={VideoTitle}
                placeholder="????????? ???????????????"
            />
            <br />
            <br />
            <label>??????</label>
            <TextArea 
                onChange={onDescriptionChange}
                value={Description}
                placeholder="????????? ???????????????"
            />
            <br />
            <br />

            <select onChange={onPrivateChange}>
                {PrivateOptions.map((item, index) => (
                    <option key={index} value={item.value}>{item.label}</option>
                ))}
            </select>

            <br />
            <br />

            <select onChange={onCategoryChange}>
                {CategoryOptions.map((item, index) => (
                    <option key={index} value={item.label}>{item.label}</option>
                ))}
            </select>

            <br />
            <br />

            <Button type="primary" size="large" onClick={onSubmit}>???????????????</Button>
                
            </Form>
        </div>
    )
}

export default VideoUploadPage
