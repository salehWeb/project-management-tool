import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@mui/material/Button';
import BackupIcon from '@mui/icons-material/Backup';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import { ChangePassword, getProfileData, updateProfile } from '../../api';
import { IUserProfileData } from '../../types/profile';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';

const myLoader = (url: string) => url;

const Profile = () => {
    const [userImage, setUserImage] = useState("")
    const [about, setAbout] = useState("")
    const [title, setTitle] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [previewUrl, setPreviewUrl] = useState("")
    const [profile, setProfile] = useState<IUserProfileData | null>(null)

    const [isLoadingChangePassword, setIsLoadingChangePassword] = useState(false)

    const init = useCallback(async () => {
        await getProfileData()
            .then((data) => { setProfile(data.data.user) })
            .catch((err) => { Swal.fire("Some Thing Went Wrong !", err.response.data.massage, 'error') });

        setUserImage("");
        setAbout("hello World");
        setTitle("hello World");
        setFirstName("hello World");
        setLastName("hello World")
        setEmail("hello World")
    }, [])

    useEffect(() => {
        init()
    }, [init])


    const HandelUpdateProfileGeneralInformation = async () => {

        await updateProfile({ firstName, lastName, email, title, about })
            .then((data: any) => { }).catch((err: any) => { });
    }

    const HandelChangePassword = async () => {
        if (!currentPassword || !newPassword) return Swal.fire("You must enter a new password", "", "error");
        setIsLoadingChangePassword(true);    
        await ChangePassword({ currentPassword, newPassword })
                .then((res) => { Swal.fire("Password Changed", res.data.massage, 'success') })
                .catch((err) => { Swal.fire("Some Thing happened wrong !", err.response.data.massage, 'error') });
            
                setIsLoadingChangePassword(false);
                setCurrentPassword("")
                setNewPassword("")
    }

    const handelUploadAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target?.files && event.target.files[0]
        if (!file) return Swal.fire('No File Selected', '', 'question');;
        if (file.size > 52428800) return Swal.fire('some think want wrong', 'file size is to big', 'error');

        setPreviewUrl(URL.createObjectURL(file))
    }

    return (
        <div className='max-w-[100vw] min-h-[100vh]'>

            <div className="m-4">

                <h1 className='text-3xl text-gray-800 font-bold mb-4'>User settings</h1>
                <div className=' gap-6 grid-flow-dense grid-cols-10 flex-wrap flex flex-col grid-rows-6 lg:grid'>

                    <div className='flex justify-start lg:w-full col-span-3 row-span-2 bg-white rounded-md shadow-md p-6'>
                        <div>
                            {previewUrl || userImage ? (
                                <Image
                                    className='rounded-md w-auto'
                                    loader={() => myLoader(previewUrl || userImage)}
                                    src={"me.png"}
                                    alt="Picture of the author"
                                    width={120}
                                    height={100}
                                />
                            ) : (
                                <Image
                                    className='rounded-md w-auto'
                                    src='/images/user-placeholder.png'
                                    alt="user-placeholder"
                                    width={120}
                                    height={100}
                                />
                            )}

                            <h1 className='text-2xl text-gray-800 font-bold'>{firstName + " " + lastName}</h1>
                            {title && (
                                <h2 className='text-gray-600'>{title}</h2>
                            )}
                            <Button size='small' startIcon={<BackupIcon />} className="text-sm mt-4 lowercase" variant="contained" component="label">
                                {userImage ? "Change picture" : "Upload picture"}
                                <input onChange={(event) => handelUploadAvatar(event)} hidden accept="image/*" type="file" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex col-span-7 lg:w-full row-span-4 flex-col justify-center  bg-white rounded-md shadow-md p-6">
                        <h1 className='text-xl text-start text-gray-800 font-bold mb-4'>General information</h1>

                        <div className='grid w-full md:grid-cols-2 grid-cols-1 gap-4'>

                            <TextField value={firstName} onChange={(event) => setFirstName(event.target.value)} id="First Name" name="First Name" label="First Name" variant="outlined" />

                            <TextField value={lastName} onChange={(event) => setLastName(event.target.value)} id="Last Name" name="Last Name" label="Last Name" variant="outlined" />

                            <TextField value={about} onChange={(event) => setAbout(event.target.value)} id="About" name="About" label="About" variant="outlined" />

                            <TextField value={title} onChange={(event) => setTitle(event.target.value)} id="Title" name="Title" label="Title" variant="outlined" />


                            <TextField value={email} onChange={(event) => setEmail(event.target.value)} id="Email" name="Email" label="Email" variant="outlined" type="email" />
                        </div>
                        <div className="flex w-full items-start">
                            <Button onClick={HandelUpdateProfileGeneralInformation} size="small" className='w-fit mt-2 bg-blue-600 text-white' variant='contained'>Save</Button>
                        </div>
                    </div>

                    <div className="flex flex-col lg:w-full col-span-7 justify-center row-span-2 bg-white rounded-md shadow-md p-6">
                        <h1 className='text-xl text-start text-gray-800 font-bold mb-4'>Password information</h1>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 w-full'>
                            <TextField id="Current password" name="Current password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} label="Current password" variant="outlined" />

                            <TextField id="New password" name="New password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} label="New password" variant="outlined" />
                        </div>

                        <div className="flex w-full items-start justify-center mt-4">
                            <Button onClick={HandelChangePassword} size="small" className='w-fit bg-blue-600 text-white' variant='contained'>
                                Change Password
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;