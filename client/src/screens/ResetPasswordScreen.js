import React, { useState } from 'react'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { phoneValidator } from '../helpers/phoneValidator'

export default function ResetPasswordScreen({ navigation }) {
  const [phone, setPhone] = useState({ value: '', error: '' })

  const sendResetPasswordEmail = () => {
    const phoneError = phoneValidator(phone.value)
    if (phoneError) {
      setPhone({ ...phone, error: phoneError })
      return
    }
    navigation.navigate('LoginScreen')
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Restore Password</Header>
      <TextInput
        label="Phone"
        returnKeyType="done"
        value={phone.value}
        onChangeText={(text) => see({ value: text, error: '' })}
        error={!!phone.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive email with password reset link."
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Send Instructions
      </Button>
    </Background>
  )
}
