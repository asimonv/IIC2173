import React from 'react';
import styled from 'styled-components'

const BubbleContainer = styled.div`
  background: ${props => {
    if (props.primary) {
      return 'lightgray';
    } else {
      return 'dodgerblue';
    }
  }};
  border-radius: 3px;
  margin: 0.5em 1em;
`;

const BubbleText = styled.p`
  color: ${props => {
    if (props.primary) {
      return 'black';
    } else {
      return 'white';
    }
  }};
  padding: 0.25em 1em;
`;

const MessageBubble = ({ children }) => (
  <BubbleContainer>
    <BubbleText>{children}</BubbleText>
  </BubbleContainer>
);

export default MessageBubble;
