import React, {useState} from 'react';

import Image from 'next/image';
import {useSession} from 'next-auth/react'
import {useRouter, usePathname} from "next/navigation";

const PormptCard = ({post, handleEdit, handleDelete, handleTagClick}) => {
    const [copied, setCopied] = useState("")
    const {data: session} = useSession();
    const pathName = usePathname()
    const router = useRouter();

    const handleCopy = () => {
        setCopied(post.prompt);
        navigator.clipboard.writeText(post.prompt);
        setTimeout(() => setCopied(""), 2000);
    }

    const handleProfileClick = () => {
        if (post.creator._id === session?.user.id) return router.push("/profile");

        router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
    }

    return (
        <div className={"prompt_card"}>
            <div className={"flex justify-between items-start gap-5"}>
                <div onClick={handleProfileClick}
                     className={"flex-1 flex justify-start items-center gap-3 cursor-pointer"}>
                    <Image
                        alt={"User Image"}
                        src={post.creator.image}
                        width={40}
                        height={40}
                        className={"rounded-full object-contain"}
                    />
                    <div className={"flex flex-col"}>
                        <h3 className={"font-satoshi font-semibold text-gray-900"}>
                            {post.creator.username}
                        </h3>
                    </div>
                </div>
                <div
                    className={"copy_btn"}
                    onClick={handleCopy}>
                    <Image
                        src={copied === post.prompt ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
                        width={12}
                        height={12}
                        alt={"copy_button"}
                    />

                </div>
            </div>
            <p className={"my-4 font-satoshi text-sm text-gray-700"}>
                {post.prompt}
            </p>
            <p className={'font-inter text-sm blue_gradient cursor-pointer'}
               onClick={() => handleTagClick && handleTagClick(post.tag)}>
                {post.tag}
            </p>
            {session?.user.id === post.creator._id && pathName === '/profile' && (
                <div className={"mt-5 flex-center gap-4 border-t border-gray-200 pt-3"}>
                    <p onClick={handleEdit} className={"font-inter text-sm green_gradient cursor-pointer"}>
                        Edit
                    </p>
                    <p onClick={handleDelete} className={"font-inter text-sm orange_gradient cursor-pointer"}>
                        Delete
                    </p>
                </div>
            )}
        </div>
    );
};

export default PormptCard;