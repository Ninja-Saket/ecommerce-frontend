import React, { useDebugValue } from "react";
import UserNav from "../../components/nav/UserNav";
import { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { updatePassword } from "firebase/auth";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e)=> {
    try{
        e.preventDefault()
        setLoading(true)
        const currentUser = auth.currentUser
        await updatePassword(currentUser, password)
        setPassword("")
        toast.success('Password Updated Successfully')
        setLoading(false)
    }catch(err){
        setLoading(false)
        console.log(err)
        toast.error(err.message)
    }
  }

  const passwordUpdateForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Your Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            value={password}
            disabled={loading}
          />
          <button className="btn btn-primary mt-2" disabled={!password || password.length < 6 || loading} type="submit">Submit</button>
        </div>
      </form>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
            {loading ? (<h4>Loading...</h4>) : (<h4> Update Your Password</h4>)}
            {passwordUpdateForm()}
        </div>

      </div>
    </div>
  );
};

export default Password;
