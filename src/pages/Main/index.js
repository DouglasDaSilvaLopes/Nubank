import React from 'react';
import { Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import Header from '~/components/Header';
import Tabs from '~/components/Tabs';
import Menu from '~/components/Menu';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container, Content, Card, CardHeader, CardContent, CardFooter, Annotation, Title, Description,
} from './styles';

function Main() {
  const translateY = new Animated.Value(0);
  const animatedEvent = Animated.event(
    [{
      nativeEvent: { translationY: translateY },
    }],
    { useNativeDriver: true },
  );

  let offset = 0;

  function resetOffset() {
    translateY.setValue(offset);
    translateY.setOffset(0);
    offset = 0;
  }

  function animatedTimingStart(openMenu) {
    offset = openMenu ? 380 : 0;
    translateY.setOffset(offset);
    translateY.setValue(0);
  }

  function getOpenMenu(translationY) {
    if (translationY >= 100) {
      return { openMenu: true };
    }

    resetOffset();
    return { openMenu: false };
  }

  function onHandlerStateChange(event) {
    const { oldState, translationY } = event.nativeEvent;
    const isActive = oldState === State.ACTIVE;

    if (isActive) {
      offset += translationY;

      const { openMenu } = getOpenMenu(translationY);

      Animated.timing(translateY, {
        toValue: openMenu ? 380 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start(animatedTimingStart(openMenu));
    }
  }

  return (
    <Container>
      <Header />
      <Content>
        <Menu translateY={translateY} />
        <PanGestureHandler
          onGestureEvent={animatedEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <Card style={{
            transform: [{
              translateY: translateY.interpolate({
                inputRange: [-350, 0, 380],
                outputRange: [-50, 0, 380],
                extrapolate: 'clamp',
              }),
            }],
          }}
          >
            <CardHeader>
              <Icon name="attach-money" size={28} color="#666" />
              <Icon name="visibility-off" size={28} color="#666" />
            </CardHeader>
            <CardContent>
              <Title>Saldo disponível</Title>
              <Description>R$ 197.611,65</Description>
            </CardContent>
            <CardFooter>
              <Annotation>
                Transferência de R$ 20,00 recebida de Diego Schell Fernandes hoje às 06:00h
              </Annotation>
            </CardFooter>
          </Card>
        </PanGestureHandler>
      </Content>
      <Tabs translateY={translateY} />
    </Container>
  );
}

export default Main;
