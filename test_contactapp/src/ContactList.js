import React from 'react'

 

const ContactList = (props) =>{
    console.log(props);

    const renderContactList = props.contacts.map((x) => {
        return(
            <div className='item'>
                <div className='content'>
                   <div className='header'>{x.name}</div>
                   <div>{x.email}</div>
                </div>
                <i className="trash alternate outline icon"
                style={{color:'red', marginTop:"7px"}}> </i>
            </div>
            
        )
    })
        return <div>{renderContactList}</div>
    }


export default ContactList;
