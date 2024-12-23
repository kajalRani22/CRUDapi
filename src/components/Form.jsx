import React, { useEffect, useState } from 'react'
import { postData, updateData } from '../api/postApi'

// eslint-disable-next-line react/prop-types
 export const Form = ({data, setData, updateDataApi, setUpdateDataApi}) => {
    const [addData, setAddData] = useState({

title: "",
body: "",


    });

    let isEmpty = Object.keys(updateDataApi).length===0;

    // get the updated data and into input field
    useEffect(()=>{
        updateDataApi &&
        setAddData({
            // eslint-disable-next-line react/prop-types
            title: updateDataApi.title || "",
            // eslint-disable-next-line react/prop-types
            body: updateDataApi.body || "",
        });
    }, [updateDataApi]);

    const handleInputChange=(e)=>{
        const name = e.target.name;
        const value = e.target.value;

        setAddData((prev)=>{
            return{
                ...prev,
                [name]: value,
            }
        })
    }

    const addPostData=async()=>{
       const res= await postData(addData)
       console.log("res", res)
       // eslint-disable-next-line no-constant-condition
       if((res.status=== 201)){
        setData([...data, res.data])
        setAddData({title: "", body: ""});
        
       }
    }

    //update post data
const  updatePostData=async()=>{
    
    // eslint-disable-next-line react/prop-types
    try {
        const res = await updateData(updateDataApi.id,addData );
        console.log(res)
   if(res.status===200){
    setData((prev)=> {
return prev.map((curElem)=>{
    return curElem.id === res.data.id ? res.data: curElem;
})
    })
    setAddData({title: "" , body: ""});
    setUpdateDataApi({});
}
    } catch (error) {
        console.log(error);
    }
}

    //Form submission
const handleFormSubmit=(e)=>{
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if(action=== "ADD"){
        addPostData();
    } else if (action=== "EDIT"){
        updatePostData();
    }  
}
  return (
    <form onSubmit={handleFormSubmit}>
        <div>
        <label htmlFor='title'></label>
            <input 
            type="text"
            autoComplete ="off"
            id="title"
            name="title"
            placeholder='Add Title'
            value={addData.title}
            onChange={handleInputChange}
            />
            
       
        </div>
        <div>
            <label htmlFor="body"></label>
            <input
            type="text"
            autoComplete='off'
            placeholder='Add Post'
            id="body"
            name="body"
            value={addData.body}
            onChange={handleInputChange}
            />
        </div>
        <button type="submit"value={isEmpty ? "ADD": "EDIT"}>
            {isEmpty ? 'ADD': "Edit"}
        </button>
    </form>
  )
}

export default Form
