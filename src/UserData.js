import React, { useEffect, useRef, useState } from "react";
export default function UserData() {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [id, setId] = useState()
    const [oneUser, setOneUser] = useState('')
    const dragItem = useRef()
    const dragOverItem = useRef()
    useEffect(() => {
        userInfo()
    }, [])

    function userInfo() {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("result", result, result[0]['id'], result[0])
                    setId(result[0]['id'])
                    setOneUser(result[0])
                    setData(result)
                },

                (error) => {
                    console.log("error", error)
                }
            )
    }
    function getUserInfo(id) {
        setId(id)
        data.forEach((ele) => {
            if (ele.id == id) {
                setOneUser(ele)
            }
        })
    }
    const dragStart = (e, position) => {
        dragItem.current = position
        console.log('dragstart', e.target.innerHTML)
    }
    const dragEnter = (e, position) => {
        dragOverItem.current = position
        console.log('dragenter', e.target.innerHTML)
    }
    const drop = (e) => {
        const copyListItems = [...data]
        const dragItemContent = copyListItems[dragItem.current]
        console.log('drop1', copyListItems, 'dragItemContent', dragItemContent)
        copyListItems.splice(dragItem.current, 1)
        console.log('drop2', copyListItems)
        // if(dragItemContent != undefined){
            copyListItems.splice(dragOverItem.current, 1, dragItemContent)
            console.log('drop3', copyListItems)
            dragItem.current = null;
            dragOverItem.current = null;
            console.log('drop', copyListItems)
            setData(copyListItems)
        // }
       
    }

    return (
        <>
            <div className="d-flex">
                <div>
                    <input type='text' className="search" value={search} placeholder='Search your users' onChange={(e) => setSearch(e.target.value)} />
                    <div className="user-list">
                        {console.log("drop in jsx", data)}
                        {data && data.filter(item => (item.username.toLowerCase()).includes(search.toLowerCase())).map((ele, index) => (
                            <div key={ele.id} onClick={() => getUserInfo(ele.id)} className='user-item' onDragStart={(e) => dragStart(e, index)} onDragEnter={(e) => dragEnter(e, index)} onDrag={drop} draggable>{ele.username}</div>
                        ))}
                    </div>
                </div>
                <div>
                    <h2>User Chart</h2>
                    <div className="user-list">
                        <h3>{oneUser.username}  ↓</h3>

                    </div>
                    <div className="d-flex">
                        <div className="user-div">
                            <h4>Address </h4>
                            <h1> ↓</h1>
                            {/* <div>{oneUser.address.city}</div>
                            <div>{oneUser.address.street}</div>
                            <div>{oneUser.address.suite}</div>
                            <div>{oneUser.address.zipcode}</div> */}
                        </div>
                        <div className="user-div" draggable>
                            <h4>Email</h4>
                            <p>{oneUser.email}</p>
                        </div>

                        <div className="user-div">
                            <h4>Website</h4>
                            <p>{oneUser.website}</p>
                        </div>


                        <div className="user-div">
                            <h4>Mobile</h4>
                            <p>{oneUser.phone}</p>
                        </div>
                        <div className="user-div">
                            <h4>Company  </h4>
                            <h1> ↓</h1>
                            {/* <div>{oneUser.company.catchPhrase}</div>
                            <div>{oneUser.company.bs}</div>
                            <div>{oneUser.company.name}</div> */}
                        </div>
                    </div>

                    {/* <div className="d-flex">
                        <div className="user-div">
                            <h4>City</h4>
                            <div>{oneUser.address.city}</div>
                        </div>

                        <div className="user-div">
                            <h4>CatchPhrase</h4>
                            <div>{oneUser.company.catchPhrase}</div>
                        </div>
                    </div>

                    <div className="d-flex">
                        <div className="user-div">
                            <h4>Street</h4>
                            <div>{oneUser.address.street}</div>
                        </div>

                        <div className="user-div">
                            <h4>BS</h4>
                            <div>{oneUser.company.bs}</div>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="user-div">
                            <h4>Suite</h4>
                            <div>{oneUser.address.suite}</div>
                        </div>

                        <div className="user-div">
                            <h4>Name</h4>
                            <div>{oneUser.company.name}</div>
                        </div>
                    </div>

                    <div className="d-flex">
                        <div className="user-div">
                            <h4>Zipcode</h4>
                            <div>{oneUser.address.zipcode}</div>
                        </div>
                    </div> */}

                </div>
                <div>
                    <select className="search" onChange={(e) => getUserInfo(e.target.value)}>
                        <option>Choose your user</option>
                        {data && data.map((ele, index) => (
                            <option key={index} value={ele.id}>{ele.name}</option>
                        ))}
                    </select>
                </div>
            </div>

        </>
    )
}