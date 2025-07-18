import React from 'react'
import moment from 'moment'
import { FaFacebookF } from 'react-icons/fa'
import { AiFillYoutube, AiOutlineTwitter } from 'react-icons/ai'
import bg_header from '../assets/Group11.png'
import logo from '../assets/logo.png'
import adver_image from '../assets/sample-add.jpg'
import Header_Category from './Header_Category'

const Header = () => {

    return (
        <div>
            <div className='px-5 lg:px-8 flex justify-between items-center bg-[#333333] text-[#cccccc]'>
                <span className='text-[13px] font-medium'>{moment().format('LLLL')}</span>
                <div className='flex gap-x-[1px]'>
                    <a className='w-[37px] h-[35px] flex justify-center items-center bg-[#ffffff2b]' href=""><FaFacebookF /></a>
                    <a className='w-[37px] h-[35px] flex justify-center items-center bg-[#ffffff2b]' href=""><AiOutlineTwitter /></a>
                    <a className='w-[37px] h-[35px] flex justify-center items-center bg-[#ffffff2b]' href=""><AiFillYoutube /></a>
                </div>
            </div>
            <div  className ="h-[250px]" style={{ backgroundImage: `url(${bg_header})`, backgroundSize: 'cover' }}>
                
            </div>
            <Header_Category />
        </div>
    )
}

export default Header