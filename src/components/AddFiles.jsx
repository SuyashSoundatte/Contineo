import React from 'react'
import ButtonComponent from './ButtonComponent'
import Input from './Input'

const AddFiles = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleClose = () => {
    setIsMenuOpen(false)
  }
  return (
    <>
      <ButtonComponent onClick={handleClick } type='button'>Add Files</ButtonComponent>
      {isMenuOpen && (
        <div className='flex justify-center items-center gap-4'>
          <Input 
            type='text'
            name='fileName'
            placeholder='Enter File Name'
          />
          <Input 
            type='file'
            name='file'
            placeholder=''
          />
          <ButtonComponent type='button'>Add</ButtonComponent>
        </div>
        
      )}
    </>
  )
}

export default AddFiles