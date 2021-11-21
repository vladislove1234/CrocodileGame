import React, {useEffect, useRef} from 'react';
import {shallowEqual, useSelector} from 'react-redux';

import Message from '../message/message';

import './chat-list.scss';

const ChatList = () => {
  const messages = useSelector(({messages}) => messages.messages);
  const [name, type] = useSelector(
    ({user}) => [user.name, user.type],
    shallowEqual,
  );

  const listRef = useRef(null);

  useEffect(() => {
    if (listRef?.current) {
      const list = listRef.current;
      list.scrollTo(0, list.scrollHeight);
    }
  }, [messages.length]);

  return (
    <ul className="chat__list" ref={listRef}>
      {
        !messages.length ?
          <Message
            id="none"
            messageType="system"
            text="Нам не вдалося знайти нових повідомлень"
          /> :
          messages.map((message, i) => {
            const senderName = message?.sender?.name;
            const lastFromUser = senderName !== messages?.[i + 1]?.sender?.name;

            return <Message
              fromMe={senderName === name}
              lastFromUser={lastFromUser}
              key={message.id}
              userType={type}
              {...message}
            />;
          })
      }
    </ul>
  );
};

export default ChatList;
