import React from 'react';
import logo from '~/assets/Nubank_Logo.png';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container, Top, Logo, Title,
} from './styles';


function Footer() {
  return (
    <Container>
      <Top>
        <Logo source={logo} />
        <Title>Douglas</Title>
      </Top>
      <Icon name="keyboard-arrow-down" size={20} color="#FFF" />
    </Container>
  );
}

export default Footer;
