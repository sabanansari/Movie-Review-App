import React from 'react';
import Container from '../Container';
import Title from '../form/Title';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import CustomLink from '../CustomLink';

export default function Signup() {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
        <Container>
            <form  className='bg-secondary rounded p-6 w-72 space-y-6'>
                <Title>Sign Up</Title>
                <FormInput label='Name' placeholder='Example' name = 'name'></FormInput>
                <FormInput label='Email' placeholder='example@email.com' name = 'email'></FormInput>
                <FormInput label='Password' placeholder='********' name = 'password'></FormInput>
                <Submit value="Sign Up"></Submit>

                <div className="flex justify-between">
                    <CustomLink to='/auth/forget-password'>Forget Password</CustomLink>
                    <CustomLink to='/auth/signin'>Sign In</CustomLink>
                </div>
            </form>
        </Container>
    </div>
  )
}
