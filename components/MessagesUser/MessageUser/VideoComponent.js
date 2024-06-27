import React from 'react';
import { View, Video, Text } from 'react-native';
import { formatMessageDate } from '../../Context/Utils';

const VideoComponent = ({ userImageUri, message, isDarkMode, messageTools }) => (
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
          width: 130,
          height: 200,
          maxHeight: 600,
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
        <Video
          source={{ uri: message.attachment.url }}
          style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10 }}
        />
        {message.text && (
          <View
            style={{
              backgroundColor: '#F80303',
              borderRadius: 10,
              maxWidth: 300,
              maxHeight: 200,
              padding: 4,
              marginTop: 5,
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
                fontSize: 14,
                color: isDarkMode ? '#FFFFFF' : '#FFFFFF',
                textAlign: 'justify',
                fontFamily: 'Roboto',
                fontWeight: '500',
                lineHeight: 24,
              }}
            >
              {message.text}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  </View>
);

export default VideoComponent;
