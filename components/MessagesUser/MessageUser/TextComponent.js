import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { formatMessageDate } from '../../Context/Utils';

const TextComponent = ({ userImageUri, message, isDarkMode, messageTools }) => (
  <View style={{ display: 'flex', flexDirection: 'row' }}>
    <Image
      source={{ uri: userImageUri || 'https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png' }}
      style={{ width: 26, height: 26, borderRadius: 100, marginRight: 10 }}
    />
    <Pressable onLongPress={messageTools}>
      <View
        style={{
          backgroundColor: '#F80303',
          borderRadius: 10,
          maxWidth: 300,
          maxHeight: 200,
          padding: 10,
          justifyContent: 'center',
          flexDirection: 'row',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: isDarkMode ? 1 : 2 },
          shadowOpacity: isDarkMode ? 0.16 : 0.6,
          shadowRadius: 3.84,
          elevation: 2,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: isDarkMode ? '#FFFFFF' : '#FFFFFF',
            textAlign: 'justify',
            fontFamily: 'Roboto',
            fontWeight: '500',
            lineHeight: 24,
          }}
        >
          {message.text}{' '}
          <Text
            style={{
              fontWeight: '400',
              marginLeft: 10,
              fontSize: 14,
              color: 'lightgray',
            }}
          >
            {formatMessageDate(message.createdAt)}
          </Text>
        </Text>
      </View>
    </Pressable>
  </View>
);

export default TextComponent;
