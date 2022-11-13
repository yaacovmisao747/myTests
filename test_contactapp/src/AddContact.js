import React from 'react'

class AddContact extends React.Component { 
render () {
    return (
        <>
           <h2>Add Contact</h2>
           <form>
              <div>
                  <label>Name</label>
                  <input type="text" name="name" placeholder='Name'/>
              </div>
              <div>
                  <label>Email</label>
                  <input type="text" name="name" placeholder='Email'/>
              </div>
              <button className='ui button yellow'>Add</button>
           </form>
        </>
    )

}
}

export  default AddContact;