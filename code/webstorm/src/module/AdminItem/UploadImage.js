import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import axios from 'axios';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

class Avatar extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            base64:'',
            getImg:'',
        };

        this.uploaderProps = {
            name:"avatar",
            data:{
                showId:1,
            },
            listType:"picture-card",
            className:"avatar-uploader",
            showUploadList:false,
            action:"http://localhost:8080/uploadImg",
            beforeUpload:(file)=>{
                console.log(file);
                let base64File;
                let self = this;
                let reader = new FileReader();
                base64File = reader.readAsDataURL(file);
                reader.onload = function(e){
                    file = e.target.result;
                    self.setState({
                        base64:file,
                    });
                    self.addAvatar();
                    return file;
                };
            },
        }
    }

    addAvatar = () =>{
        let params = new URLSearchParams();
        params.append('imgUrl',this.state.base64);
        params.append('showId',1);
        axios.post('/addImage', params);
    };



    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    };

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        return (
            <div>
                <Upload
                    {...this.uploaderProps}
                    onChange={this.handleChange}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                </Upload>
            </div>
        );
    }
}

export default Avatar;