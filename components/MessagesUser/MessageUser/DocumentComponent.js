import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { formatMessageDate } from '../../Context/Utils';

const DocumentComponent = ({ userImageUri, message, isDarkMode, messageTools }) => (
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
        <Text
          style={{
            width: '100%',
            borderRadius: 10,
            color: 'blue', // couleur du lien
            textDecorationLine: 'underline', // soulignement du lien
          }}
          onPress={() => Linking.openURL(message.attachment.url)}
        >
          {message.attachment.url}
        </Text>
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

export default DocumentComponent;
