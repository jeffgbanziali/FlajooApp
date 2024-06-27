import React from 'react';
import { View, Image, Pressable, Text, Linking } from 'react-native';
import { formatMessageDate } from '../../Context/Utils';

const ImageComponent = ({ userImageUri, message, isDarkMode, messageTools, handleImagePress }) => (
  <View style={{ display: 'flex', flexDirection: 'row' }}>
    <Image
      source={{ uri: userImageUri || 'https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png' }}
      style={{ width: 26, height: 26, borderRadius: 100, marginRight: 10 }}
    />
    <Pressable onLongPress={messageTools} onPress={() => handleImagePress(message.attachment.url)}>
      <View
        style={{
          backgroundColor: '#F80303',
          borderRadius: 10,
          width: 200,
          height: 300,
          maxHeight: 600,
          padding: 4,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'column',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: isDarkMode ? 1 : 2 },
          shadowOpacity: isDarkMode ? 0.16 : 0.6,
          shadowRadius: 3.84,
          elevation: 2,
        }}
      >
        <Image
          source={{ uri: message.attachment.url }}
          style={{ width: '100%', height: '90%', resizeMode: 'cover', borderRadius: 10 }}
        />
        {message.text && (
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
        )}
      </View>
    </Pressable>
  </View>
);

export default ImageComponent;
