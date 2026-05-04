import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Loader from '../loader/Loader.jsx'

const CreatePost = () => {

    const [loader, setLoader] = useState(false);

    const navigate = useNavigate()
    const [fileName, setFileName] = useState('No file chosen')

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name)
        } else {
            setFileName('No file chosen')
        }  
    }

    const handleSubmit = async (e) => {

        e.preventDefault()
 
        setLoader(true);

        const formData = new FormData(e.target)

        axios.post("http://localhost:3000/create-post", formData)
            .then((res) => {
                setLoader(false);
                navigate("/feed")
            })
            .catch((err) => {
                console.log(err)
                alert("Error creating post")
                setLoader(false)
            })
    }

    return (
        <section className='create-post-section' >
            {loader && <Loader />}
            <div className='create-post-header'>
                <h1>Create a New Post</h1>
                <p>Share your moment with the world</p>
            </div>

            <form onSubmit={handleSubmit} className='create-post-form'>
                <div className='form-group'>
                    <label htmlFor='image'>Upload Image</label>
                    <div className='file-input-wrapper'>
                        <input
                            type='file'
                            id='image'
                            name="image"
                            accept="image/*"
                            required
                            onChange={handleFileChange}
                            className='file-input'
                        />
                        <label htmlFor='image' className='file-input-label'>
                            <span className='file-input-text'>Choose File</span>
                            <span className='file-name'>{fileName}</span>
                        </label>
                    </div>
                </div>

                <div className='form-group'>
                    <label htmlFor='caption'>Caption</label>
                    <input type="text" id='caption' name='caption' placeholder='Write a caption...' required />
                </div>

                <button type='submit' className='submit-btn'>Post</button>
            </form>
        </section>
    )
}

export default CreatePost