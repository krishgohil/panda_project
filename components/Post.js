import React, { useRef, useState, useEffect } from 'react'
import { MdOutlineLink, MdPermMedia } from 'react-icons/md'
import { AiOutlineCamera, AiOutlineClose } from 'react-icons/ai'
import { FaPollH, FaUserCircle } from 'react-icons/fa'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { toast } from 'react-toastify'
import { host } from '../host'
import { useAppContext } from '../context';
import { useRouter } from 'next/router';
import { Form } from 'react-bootstrap';
import ImageCropMain from './ImageCropMain';





const Post = ({ handlecancel }) => {
    const router = useRouter()
    const context = useAppContext()
    const { username, _id, profileImg } = context.sharedState
    const [freeze, setfreeze] = useState(false)
    const [img, setimg] = useState({ profileImg: '' })
    const [hasChangedImage, sethasChangedImage] = useState(false)
    const [credentials, setcredentials] = useState({ description: "", title: "", link: "", category: "" })

    const [postimg, setpostimg] = useState([])
    const [productInfo, setproductInfo] = useState({ description: "", name: "", tagLine: "", productCategory: "", link: "" })

    const [showpreview, setshowpreview] = useState(false)

    const [templink, settemplink] = useState('')
    const [isLink, setisLink] = useState(false)


    const [fruit, setfruit] = useState(0)

    const hi = useRef()
    const ref = useRef()
    const productRef = useRef()


    const otherRef = useRef()
    const [showLinkInput, setshowLinkInput] = useState(false)

    const [showPoll, setshowPoll] = useState(false)
    const [pollOptions, setpollOptions] = useState(2)

    const [optionOne, setoptionOne] = useState('')
    const [optionTwo, setoptionTwo] = useState('')
    const [optionThree, setoptionThree] = useState('')
    const [optionFour, setoptionFour] = useState('')
    const [price, setprice] = useState(0)
    const [discountedPrice, setdiscountedPrice] = useState(0)
    const [changeImgs, setchangeImgs] = useState(false)
    const [oldImgs, setoldImgs] = useState([])
    const [editingImg, seteditingImg] = useState(false)

    const [draggable_id, setdraggable_id] = useState("")


    useEffect(() => {
        console.log(postimg, "dhadkan", editingImg)
    }, [editingImg, draggable_id])

    const category = "home"

    const editProduct = {
        status: false
    }
    useEffect(() => {

        console.log(category)
        if (category !== 'home') {
            // console.log("1")
            if (category == 'product') {
                // console.log("2")

                if (repost && repost.status == true) {
                    setcredentials({ ...credentials, category: 'personal' })
                } else {
                    setcredentials({ ...credentials, category: 'product' })

                }


            } else {
                // console.log("3")
                setcredentials({ ...credentials, category: category })

            }
        }
        else if (category == "home" && editProduct.status == true) {
            console.log("4")

            if (editProduct.productId && editProduct.productId.length == 24) {
                dispatch(fetchUniqPost(editProduct.productId))

            }        // alert()
            setcredentials({ ...credentials, category: 'product' })

        }

        else {
            setcredentials({ ...credentials, category: 'personal' })
        }
    }, []);



    const fetchUniqPost = (id) => async dispatch => {

        console.log('FEETCH UNIQ POST', id)
        try {

            const response = await fetch(`${host}/api/product/fetchUniqProduct`, {
                // const response = await fetch("${host}/api/post/fetchUniqPost", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId: id }),
            })
            const json = await response.json();
            console.log(json)

            setproductInfo({ description: json[0].description, name: json[0].title, tagLine: json[0].tagLine, productCategory: json[0].productCategory, link: json[0].link })
            setpostimg(json[0].postimg)
            setprice(json[0].price)
            setdiscountedPrice(json[0].discountedPrice)

        } catch (error) {

        }
    }
































    const addProductImg = () => {
        if (postimg.length > 9) {
            toast.info('Cannot add more than 10 photos', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark'

            })

        } else {
            productRef.current.click()
        }
    }

    const handleImgClick = () => {

        setshowPoll(false)
        setpollOptions(2)


        if (postimg.length > 9) {
            toast.info('Cannot add more than 10 photos', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark'

            })

        } else {
            setshowpreview(true)
            ref.current.click()
        }



    }












    const showLinkInputFunc = () => {
        setshowLinkInput(true)
    }


    const validURL = (str) => {
        console.log(str)
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        console.log(!!pattern.test(str))
        if (!!pattern.test(str) == true) {
            // setlink(str)
            setisLink(true)
        }
        else if (!!pattern.test(str) == false) {
            console.log('false hai enterred')
            // console.log(link.length)
            setisLink(false)
        }
        setcredentials({ ...credentials, link: str })


    }

    const onchangelink = (e) => {
        settemplink(e.target.value)
        validURL(e.target.value)
    }






    //----------------------------------------------------------------------------------------------------------------------



    useEffect(() => {
        console.log("ksdjfksjfklsjf", credentials.category)
    }, [credentials.category])




    const onchangeFunc = (e) => {
        console.log("fksjkfk")
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }


    const onFileChange = (e) => {
        console.log('ON FIILE  CHANGE')
        console.log(e.target.files[0])
        setimg({ ...img, profileImg: e.target.files[0] })
    }




    const onImgChange = (e) => {
        console.log(postimg, 'on img change', e.target.files.length)

        let p = postimg
        let l = e.target.files
        console.log(p.length)
        console.log(l.length)

        let final
        for (let i = 0; i < l.length; i++) {
            p.push(l[i])
        }
        console.log(p.length)
        if (p.length > 10) {
            p.length = 10
            toast.info('Cannot add more than 10 photos', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark'

            })
            setfruit(fruit + 1)
            final = p
            setpostimg(final)
        } else {
            setfruit(fruit + 1)
            final = p
            setpostimg(final)
        }

    }

    const setImgFunc = (image, index) => {
        console.log(postimg)
        console.log(index)
        console.log(image)
        let arr = []
        for (let i = 0; i < postimg.length; i++) {

            if (i == index) {
                arr.push(image)
            } else {
                arr.push(postimg[i])
            }

        }
        setpostimg(arr)
        // setcredentials({ ...credentials, postimg: image })
    }



    async function handleSubmit(e) {
        e.preventDefault();
        const { _name, _email, password, bio, profileImg, username } = credentials;
        console.log(username)
        console.log(_name)
        let checkusername = username.match(/\s/g)
        let email = _email.toLowerCase()
        let _nametouppercase = _name.toUpperCase()
        let withoutspacename = _nametouppercase.replace(/\s\s+/g, ' ')
        console.log(withoutspacename)
        let name = withoutspacename
        console.log(email)
        console.log(name)
        let checkemail = email.match(/\s/g)

        console.log(checkusername)
        if (checkusername) {
            alert('Spaces are not allowed in username')
        }
        else if (checkemail) {
            alert('Spaces are not allowed in email')
        }
    }



    async function save() {
        setfreeze(true)

        const formData = new FormData();

        console.log(credentials)
        let _description = linkify(credentials.description)
        console.log(postimg)
        formData.append(`title`, credentials.title)
        formData.append(`description`, _description)
        formData.append(`imgLength`, postimg.length)
        formData.append(`category`, credentials.category)
        formData.append(`_id`, _id)

        setTimeout(() => {
            setfreeze(false)

        }, 2000);





        for (let i = 0; i < postimg.length; i++) {

            console.log(postimg[i])
            if (typeof postimg[i] == "string") {
                // formData.append(`linkImg${i}`, tempLinks[postimg])
                // formData.append(`linkTitle${i}`, tempLinks[i].title)
                // formData.append(`linkUrl${i}`, tempLinks[i].url)
                // formData.append(`linkFullScreen${i}`, tempLinks[i].fullWidth)
                // formData.append(`linkDate${i}`, tempLinks[i].date)
            } else if (typeof postimg[i] == "object") {
                console.log("objvct")
                const dat = new FormData()
                dat.append("file", postimg[i])
                dat.append("upload_preset", "l0nuoz4a")

                const response = await fetch("https://api.cloudinary.com/v1_1/dmjoqk3ww/image/upload", {
                    method: 'POST',
                    body: dat
                });
                const json = await response.json();

                console.log(json)
                formData.append(`img${i}`, json.secure_url)
                // formData.append(`linkTitle${i}`, tempLinks[i].title)
                // formData.append(`linkUrl${i}`, tempLinks[i].url)
                // formData.append(`linkFullScreen${i}`, tempLinks[i].fullWidth)
                // formData.append(`linkDate${i}`, tempLinks[i].date)
            }
        }

        console.log("feedfdlk")
        const response = await fetch(`${host}/api/post/addtoreview`, {
            method: 'POST',
            body: formData
        });
        const json = await response.json();
        console.log(json)

















        // if (showPoll == false) {
        //     console.log(showPoll, 'new_post')

        //     new_post()
        // } else if (showPoll == true) {
        //     console.log(showPoll, 'showoll')

        //     dispatch(newpoll())
        // }
        // console.log(postimg, 'postimg')
        // console.log(credentials.description, 'credentials.description')
        // console.log(credentials.title, 'credentials.title')


        // newpostwithimg()

        // console.log(credentials.description)
        // console.log(credentials.postimg)
        // console.log('e kunal')
        // console.log(optionOne, '1')
        // console.log(optionTwo, '2')
        // console.log(optionThree, '3')
        // console.log(optionFour, '4')
        // if (postimg.length < 1 && showPoll == false) {
        //     dispatch(newpost())
        // }
        // else if (postimg.length > 0 && showPoll == false) {
        //     newpostwithimg()
        // }
        // else if (showPoll == true) {
        //     console.log('bddcdz')
        //     dispatch(newpoll())

        // }

    }

    // /#[a-z0-9_]+/g
    function linkify(text) {
        var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return text.replace(urlRegex, function (url) {
            return '<a href=" ' + url + '" class="textAnker" " target=_blank">' + url + '</a>';
        });
    }
    function hashify(text) {
        var urlRegex = /#[a-z0-9_]+/g;
        return text.replace(urlRegex, function (url) {
            return '<span  class="texthash"  >' + url + '</span>';
        });
    }

    function atSignify(text) {
        var urlRegex = /@[a-z0-9_]+/g;
        return text.replace(urlRegex, function (url) {
            return '<span  class="textuser"  >' + url + '</span>';
        });
    }

    async function new_post(e) {

        var _link
        var _description
        var _title
        if (credentials.description == null || credentials.description == undefined) {
            _description = ""
        } else { _description = credentials.description }

        if (credentials.title == null || credentials.title == undefined) {
            _title = ""
        } else { _title = credentials.title }


        if (credentials.link == null || credentials.link == undefined) {
            _link = ""
        } else { _link = credentials.link }

        _description = linkify(_description)
        _description = hashify(_description)
        _description = atSignify(_description)
        console.log(_description)

        let withoutspacetitle = _title.replace(/\s\s+/g, ' ')
        let withoutspacedesc = _description.replace(/\s\s+/g, ' ')
        // alert(credentials.category)

        console.log(repost)

        if (withoutspacetitle.length < 1 && credentials.category !== "personal") {
            setfreeze(false)
            return (
                toast.error('Title cannot be empty', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'

                })
            )
        }
        if (withoutspacedesc.length < 1) {
            setfreeze(false)

            return (
                toast.error('Description cannot be empty', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'

                })
            )
        }







        console.log(postimg, 'postimg')
        console.log(credentials.description, 'credentials.description', _description, "d")
        console.log(credentials.title, 'credentials.title', _title, "t")
        console.log(credentials.category, 'credentials.category', _link, "l")

        let formData = new FormData();


        formData.append('id', userId);
        formData.append('description', _description);
        formData.append('link', _link);
        formData.append('title', _title);
        formData.append('category', credentials.category);
        if (repost.status == true) {
            formData.append('isRepost', true);
            if (repost.p_id) {
                console.log('dekh me loyal hu', repost.p_id)

                formData.append('repostId', repost.p_id);
                formData.append('reposts_notificationSettings', repost.pnotificationSettings.reposts);
                formData.append('notificationToken', repost.pnotificationToken);
                formData.append('username', username);

            }
            if (repost.isYtpost) {
                console.log('idhar hai aapun mamu', repost.yturl)
                formData.append('ytlink', repost.yturl);
            }
        }
        console.log("photo", postimg.length)

        for (let i = 0; i < postimg.length; i++) {
            console.log("photo", postimg[i])
            formData.append('photo', postimg[i]);

        }
        var post_type
        if (postimg.length > 0) {
            console.log("media")
            post_type = 'media'
        } else {
            console.log("kwik")

            post_type = 'kwik'
        }

        formData.append('post_type', post_type);
        console.log(formData)

        const response = await fetch(`${host}/api/post/newpost`, {
            method: 'PUT',

            body: formData
        });
        const json = await response.json();
        console.log(json)
        if (json.result === 'success') {
            toast.success('Posted Successfully', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark'

            })
            handlecancel()
            setfreeze(false)
            if (repost.status == true) {
                dispatch({
                    type: SET_REPOSTED_POSTS,
                    payload: {
                        postId: repost.p_id,
                        repostCount: repost.p_repostCount,
                        repost: true
                    }
                })
            }

            let obj = json.post
            obj.postedBy = {
                _id: _id,
                notificationSettings: notificationSettings,
                username: username,
                profileImg: profileImg,
                notificationToken: notificationToken,
            }

            dispatch({
                type: SET_NEW_POST,
                payload: obj
            })
        } else {
            setfreeze(false)
            toast.warn('Oops Something went wrong', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark'

            })
        }
    }

    const newpoll = () => async dispatch => {
        var _description
        var _title
        var _link
        if (credentials.description == null || credentials.description == undefined) {
            _description = ""
        } else { _description = credentials.description }

        if (credentials.title == null || credentials.title == undefined) {
            _title = ""
        } else { _title = credentials.title }

        if (credentials.link == null || credentials.link == undefined) {
            _link = ""
        } else { _link = credentials.link }
        console.log(credentials.description, 'credentials.description', _description, "d")
        console.log(credentials.title, 'credentials.title', _title, "t")
        console.log(credentials.category, 'credentials.category', _link, "l")
        const response = await fetch(`${host}/api/post/newpoll`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: _title, description: _description, optionFour, optionThree, optionOne, optionTwo, id: userId, category: credentials.category, link: _link }),
        });
        const json = await response.json();
        console.log(json)
        if (json.result === 'success') {
            toast.success('Posted Successfully', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark'

            })
            handlecancel()
            setfreeze(false)
        } else {
            setfreeze(false)
        }

    }


    const newpost = () => async dispatch => {
        const response = await fetch(`${host}/api/post/newpost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description: credentials.description, postimg: credentials.postimg, id: userId }),
        });
        const json = await response.json();
        console.log(json)
        if (json === 'success') {
            handlecancel()
        }

    }





    async function newpostwithimg(e) {
        console.log(postimg.length)
        let formData = new FormData();
        formData.append('id', userId);
        formData.append('description', credentials.description);
        for (let i = 0; i < postimg.length; i++) {
            formData.append('photo', postimg[i]);

        }
        // formData.append('avatar', postimg);
        console.log(formData)
        const response = await fetch(`${host}/api/post/newpostwithimg`, {
            method: 'PUT',
            // headers: {
            //     'Content-Type': 'application/json',
            // },
            // body: JSON.stringify({ description: credentials.description, id: userId }),
            body: formData
            // ({ postimg: postimg })
        });
        const json = await response.json();
        console.log(json)
        if (json === 'success') {
            handlecancel()
        }
        // const formData = new FormData()
        // if (postimg.length > 0) {

        //     formData.append('profileImg', postimg)
        //     formData.append('token', 'efghi')
        //     formData.append('id', userId);
        //     formData.append('description', credentials.description);
        //     axios.post(`${host}/post/newpostwithimg`, formData, {
        //     }).then(res => {
        //         console.log(res, 'idhar hai')
        //         handlecancel()

        //     })
        // }
    }

    // const changepostType = () => {
    //     setpersonalpost(true)
    //     setreview(false)
    //     settitle('')
    //     setdescription('')
    //     setrowsize(1)
    // }

    const delImg = () => {
        setcredentials({ ...credentials, postimg: '' })
        setshowpreview(false)
        setimg({ ...img, profileImg: '' })
    }


    const handlePoll = () => {
        setpostimg([])
        setshowPoll(true)

    }



    // product 
    useEffect(() => {
        if (postimg.length > 0) {
            setTimeout(() => {
                hi.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
            console.log('change kiya')
        }
    }, [fruit])





    const onchange = (e) => {
        if (e.target.name == "name" && editProduct && editProduct.status == true) {
            toast.warn('Product Name cannot be changed', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            })
        } else {

            setproductInfo({ ...productInfo, [e.target.name]: e.target.value });
        }

    }



    async function newproduct(e) {
        setfreeze(true)



        // console.log(postimg.length, 'postimg', postimg)
        // console.log('id', userId)
        // console.log('description', productInfo.description)
        // console.log('name', productInfo.name)
        // console.log('tagLine', productInfo.tagLine)
        // console.log('link', productInfo.link)
        // console.log('productCategory', productInfo.productCategory)
        let _name = productInfo.name
        let _description = productInfo.description
        let _tagline = productInfo.tagLine
        let withoutspacename = _name.replace(/\s\s+/g, ' ')
        let withoutspacedesc = _description.replace(/\s\s+/g, ' ')
        let withoutspacetagline = _tagline.replace(/\s\s+/g, ' ')

        if (withoutspacename.length < 1) {
            setfreeze(false)
            return (
                toast.error('Product Name cannot be empty', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                })
            )

        }
        if (withoutspacedesc.length < 1) {
            setfreeze(false)
            return (
                toast.error('Product Description cannot be empty', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                })
            )

        }

        if (withoutspacetagline.length < 1) {
            setfreeze(false)
            return (
                toast.error('Product Tagline cannot be empty', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                })
            )

        }

        if (postimg.length == 0) {
            setfreeze(false)
            return (
                toast.error('Atleast One Image should be uploaded', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                })
            )
        }

        let p = parseInt(price, 10)
        let dp = parseInt(discountedPrice, 10)
        if (p < dp) {
            return (
                toast.warn('Discount Price should be lower than original Price', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                })
            )
        }


        console.log(postimg)
        console.log(productInfo.name)





        let formData = new FormData();
        formData.append('id', userId);
        formData.append('description', productInfo.description);
        formData.append('link', productInfo.link);
        formData.append('name', productInfo.name);
        formData.append('tagLine', productInfo.tagLine);
        formData.append('productCategory', productInfo.productCategory);
        formData.append('price', price);
        formData.append('discountedPrice', discountedPrice);
        formData.append('changeImgs', changeImgs);
        for (let i = 0; i < postimg.length; i++) {
            formData.append('photo', postimg[i]);
        }


        if (editProduct && editProduct.status == false) {
            const response = await fetch(`${host}/api/product/newproduct`, {
                method: 'PUT',

                body: formData
            });
            const json = await response.json();
            console.log(json)
            if (json.result === 'success') {


                toast.success('Posted Successfully', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'

                })
                handlecancel()
                setfreeze(false)


                let obj = json.post
                obj.postedBy = {
                    _id: _id,
                    notificationSettings: notificationSettings,
                    username: username,
                    profileImg: profileImg,
                    notificationToken: notificationToken,
                }
                dispatch({
                    type: SET_NEW_POST,
                    payload: obj
                })
            } else {
                setfreeze(false)
            }
        } else if (editProduct && editProduct.status == true) {
            if (oldImgs.length > 0) {
                for (let ol = 0; ol < oldImgs.length; ol++) {
                    formData.append('oldImgs', oldImgs[ol]);

                }
            }
            formData.append('productId', editProduct.productId);

            const response = await fetch(`${host}/api/product/editproduct`, {
                method: 'PUT',

                body: formData
            });
            const json = await response.json();
            console.log(json)
            if (json === 'success') {
                handlecancel()
                setfreeze(false)
            } else {
                setfreeze(false)
            }
        }


    }


    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const arr = [...postimg];

        //Changing the position of Array element
        let removedItem = arr.splice(result.source.index, 1)[0];
        arr.splice(result.destination.index, 0, removedItem);

        //Updating the list
        setpostimg(arr);
    }
    const removePhoto = (e) => {
        let arr = postimg
        if (e > -1) { // only splice array when item is found

            arr.splice(e, 1); // 2nd parameter means remove one item only
            setpostimg(arr)
            setfruit(fruit + 1)
        }
        console.log(e)
    }


    const closeRepost = () => {
        dispatch({
            type: SET_REPOST,
            payload: {
                status: false,
                description: '',
                postimg: '',
                pUsername: '',
                pProfileImg: '',
                pDate: '',
            }
        })
    }

    const setDiscpFunc = (e) => {
        console.log(e.target.value, "etv",)
        var dp
        if (e.target.value == "") {
            dp = 0
            setdiscountedPrice(e.target.value)

            // setdiscountedPrice(dp)
        } else {
            dp = parseInt(e.target.value, 10)
            let p = parseInt(price, 10)
            console.log(dp, "op", p)

            if (dp < p) {
                // console.log(e.target.value, "op", price)
                // console.log(typeof price)
                // console.log(typeof e.target.value)
                setdiscountedPrice(e.target.value)
            } else {
                toast.warn('Discount Price should be lower than original Price', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                })
            }
        }


    }



    const editChangeImgsFunc = () => {
        if (changeImgs) {
            setchangeImgs(false)
            setpostimg(oldImgs)
        } else {
            setoldImgs(postimg)
            setpostimg([])
            setchangeImgs(true)
        }
    }

    return (
        <>





            <div className='postdiv'>

                <div className='postUser' >
                    <div style={{ display: 'flex', alignItems: 'center' }}>

                        {
                            profileImg !== '' ?
                                <img alt="img" src={profileImg} style={{ height: '2.5rem', width: '2.5rem', borderRadius: '50%', marginRight: '0.6rem', cursor: 'pointer', marginLeft: "0.5rem" }} ></img>
                                : <FaUserCircle style={{ height: '2.5rem', width: '2.5rem', cursor: "pointer", marginLeft: '1rem', borderRadius: '50%' }} />
                        }

                        <p style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', color: 'white' }} >
                            {username}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", margin: "0.5rem" }} >
                        <select value={credentials.category} name='category' onChange={onchangeFunc} id="" style={{ outline: "none", backgroundColor: "#19191a", color: "silver", margin: '0.5rem', padding: "0.5rem", border: '1px solid #363636', borderRadius: "1rem", fontSize: "14px" }} >
                            <option value="books">books</option>
                            <option value="cryptos">cryptos</option>
                            <option value="colleges">colleges</option>
                            <option value="movies">movies</option>
                            <option value="restaurants">restaurants</option>
                            <option value="sports">sports</option>
                            <option value="companies">companies</option>
                            {/* {
                                            repost.status == false ?
                                                <option value="product">product 🚀</option>
                                                : ""
                                        } */}
                            <option value="stocks">stocks</option>
                            <option value="hotels">hotels</option>
                            <option value="shows">shows</option>
                            <option value="youtube">youtube</option>

                        </select>
                    </div>
                    <div className='cancel'  >
                        <AiOutlineClose size={28} onClick={() => router.back()} style={{ marginBottom: '0.4rem' }} className='cancelIcon' />
                    </div>
                </div>

                <div className='postinfo'>
                    <input value={credentials.title} name='title' required pattern="[a-zA-Z0-9 ]+" onChange={onchangeFunc} type="text" style={{ padding: "0.5rem", outline: "none", border: "1px solid #363636", backgroundColor: "#16181b", width: "100%", caretColor: 'white ', color: "white", fontWeight: "500", borderRadius: '0.5rem', margin: "0.5rem 0" }} maxLength='100' placeholder='Title' />

                    {
                        postimg.length > 0 ?
                            <DragDropContext onDragEnd={handleOnDragEnd}>

                                <Droppable droppableId="characters" direction="horizontal" >
                                    {(provided) => (
                                        <>
                                            <div className='' style={{ width: "100%", overflowX: "scroll", scrollMargin: 0, display: "flex", padding: "0.5rem", border: "1px solid #48494a", marginTop: "0.5rem", alignItems: "" }}   {...provided.droppableProps} ref={provided.innerRef}>
                                                {postimg.map((rev, i) => {
                                                    return (

                                                        <Draggable isDragDisabled={editingImg} key={rev.name ? rev.name : draggable_id} draggableId={rev.name ? rev.name : draggable_id} index={i}>
                                                            {(provided) => (
                                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                                                    <div ref={otherRef} onClick={delImg}>
                                                                        <div onClick={() => { removePhoto(i) }} style={{ margin: " 0 0rem", top: '12px', position: 'relative', cursor: "pointer" }} >
                                                                            <AiOutlineClose color='white' size={20} />
                                                                        </div>
                                                                    </div>
                                                                    <div className='previewimg'  > b
                                                                        <ImageCropMain img={rev} id={1} setImgFunc={setImgFunc} index={i} seteditingImg={seteditingImg} setdraggable_id={setdraggable_id} name={rev.name ? rev.name : draggable_id} />
                                                                    </div>




                                                                </div>


                                                            )}
                                                        </Draggable>
                                                    );
                                                })}
                                                {provided.placeholder}
                                            </div>

                                        </>


                                    )}
                                </Droppable>

                            </DragDropContext>
                            :
                            <div style={{ color: "gray", display: "flex" }} >
                                <div style={{ border: "1px solid #363636", padding: "0.5rem", display: "flex", flexDirection: "column", alignItems: "center" }} >
                                    <p>                                Add Images
                                    </p>
                                    <div>
                                        <MdPermMedia onClick={handleImgClick} size={50} style={{ color: '#dedede', }} />
                                    </div>                                </div>

                            </div>
                    }

                    <Form.Control
                        value={credentials.description}
                        onChange={(e) => setcredentials({ ...credentials, description: e.target.value })}
                        // onChange={(e) => settempUserInfo({ ...tempUserInfo, about: e.target.value })}
                        as="textarea"
                        placeholder="description (optional)"
                        style={{ resize: 'none', outline: 'none', padding: '0.5rem', backgroundColor: "#16181b", caretColor: "white ", color: "white", border: '1px solid #363636', borderRadius: "0.5rem", width: '100%', margin: '0.5rem 0' }}
                        rows={5}

                    // value={tempUserInfo.about}
                    />
                    {
                        credentials.postimg && showpreview ?
                            <hr style={{ margin: 0, marginBottom: '0.2rem' }} />
                            : ''
                    }


                    {
                        showLinkInput ?
                            <input name='link' onChange={onchangelink} value={credentials.link} type="text" style={isLink ? { padding: "0.5rem", outline: "none", border: "1px solid #363636", backgroundColor: "#16181b", width: "100%", caretColor: 'white ', color: "skyblue", fontWeight: "500", borderRadius: '0.5rem', margin: "0.5rem 0" } : { padding: "0.5rem", outline: "none", border: "1px solid #363636", backgroundColor: "#16181b", width: "100%", caretColor: 'white ', color: "white", fontWeight: "500", borderRadius: '0.5rem', margin: "0.5rem 0" }} maxLength='100' placeholder='link' />
                            : ""
                    }





                </div>
                <input type="file" accept="image/png, image/jpg, image/jpeg" style={{ display: 'none' }} ref={ref} onChange={onImgChange} multiple="multiple" />




                <div className='postIcons_Btn'  >
                    <div className='uploadicons'>
                    </div>
                    <button
                        className={freeze ? 'postbtn postbtndisabled' : 'postbtn'}
                        disabled={freeze ? true : false}
                        type="submit"
                        onClick={save}
                    > {postimg.length == 0 && credentials.description !== '' && showPoll == false ? 'Kwik' : 'ADD TO REVIEW'} </button>
                </div>
            </div>


        </>

    )
}

export default Post
