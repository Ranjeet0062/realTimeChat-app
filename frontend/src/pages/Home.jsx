import { Button } from '@/components/ui/button';
import { setuser } from '@/reducer/userReducer';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function Home() {
  const data = useSelector((state) => state.user);
  console.log("data inside",data)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleClick = async () => {
    dispatch(setuser(null));
    navigate("/")
  }


  return (
    data.user?
      (
        <>
          <div>Welcome!{data?.user?.firstName} {data?.user?.lastName}</div>
          <Button onClick={handleClick}>logout</Button>
        </>
      )
      :
      (<div>hello</div>)
  )
}

export default Home