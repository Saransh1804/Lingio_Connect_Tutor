export const getTutor = async(password)=>{
    const response = await fetch(`/api/tutor`,{
        method:"POST",
        headers:{
            "Content-Type" :"application/json",
        },
        body:JSON.stringify({password})

    })

    if(!response.ok)
        throw new Error("Error in login")

    return response.json()
}


export const getMessages = async(tutorId, userId)=>{
    const response = await fetch(`/api/message/getMessages`, {
      method:"POST",
      headers:{
        "Content-Type" :"application/json",
      },
      body:JSON.stringify({tutorId, userId})

     
    })
    if(!response.ok)
      throw new Error("Error fetching messages")

    return response.json()
        

  }

  export const sendMessage = async(id, userId , message)=>{
    const response = await fetch(`/api/message/sendMessage`, {
      method:"POST",
      headers:{
        "Content-Type" :"application/json",
      },
      body:JSON.stringify({id, userId, message})
    })

    if(!response.ok)
      throw new Error("Error sending message")

    return response.json()
  }


  export const getToken = async(tutorId)=>{
    console.log(tutorId)
    const response  = await fetch (`/api/tutor/getToken`,{
      method:"POST",
      headers:{
        "Content-Type" :"application/json"
      },
      body:JSON.stringify({tutorId})
    })

    if(!response.ok)
      throw new Error("Error getting token")
    return response.json()
  }