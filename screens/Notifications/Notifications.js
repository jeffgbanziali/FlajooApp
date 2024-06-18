import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, SafeAreaView, Image, TextInput } from 'react-native';
import { useDarkMode } from '../../components/Context/AppContext';
import { useTranslation } from 'react-i18next';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

const notifications = [
    { id: '1', type: 'like', user: 'John Doe', message: 'liked your photo', avatar: 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png' },
    { id: '2', type: 'comment', user: 'Jane Smith', message: 'commented on your post', avatar: 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png' },
    { id: '3', type: 'follow', user: 'Alice Johnson', message: 'started following you', avatar: 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png' },
    { id: '4', type: 'post', user: 'Bob Brown', message: 'posted a new photo', avatar: 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png' },
    { id: '5', type: 'story', user: 'Charlie Green', message: 'added to their story', avatar: 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png' },
    // Ajoutez d'autres notifications ici
];

const NotificationItem = ({ item }) => {
    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();

    let icon;
    switch (item.type) {
        case 'like':
            icon = '❤️';
            break;
        case 'comment':
            icon = '💬';
            break;
        case 'follow':
            icon = '➕';
            break;
        case 'post':
            icon = '📷';
            break;
        case 'story':
            icon = '📖';
            break;
        default:
            icon = '🔔';
            break;
    }

    return (
        <Pressable style={styles.notificationItem}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.notificationTextContainer}>
                <Text style={[styles.notificationText, { color: isDarkMode ? "gray" : "gray", }]}>
                    <Text style={[styles.username, { color: isDarkMode ? "#F7F4F4" : "#5E5E5E", }]}>{item.user}</Text> {item.message}
                </Text>
            </View>
            <Text style={styles.notificationIcon}>{icon}</Text>
        </Pressable>
    );
};

const Header = () => {
    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();

    return (
        <View style={[styles.headerContainer, { backgroundColor: isDarkMode ? "#0D0C0C" : "#F3F2F2", }]}>
            <Text style={[styles.headerTitle, { color: isDarkMode ? '#ffffff' : '#000000' }]}>{t('Notifications')}</Text>

            <View style={{
                width: 120,
                flexDirection: "row",
                justifyContent: "space-around",
                paddingRight: 10
            }}>
                <View style={[styles.searchContainer, { backgroundColor: isDarkMode ? "#161414" : "#E3E4E5", }]}>
                    <Feather
                        name="settings"
                        size={20}
                        color={isDarkMode ? "white" : "black"} />

                </View>
                <View style={[styles.searchContainer, { backgroundColor: isDarkMode ? "#161414" : "#E3E4E5", }]}>
                    <AntDesign
                        name="search1"
                        size={20}
                        color={isDarkMode ? "white" : "black"} />

                </View>
            </View>

        </View>
    );
};

const NotificationsScreen = () => {
    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? "#0D0C0C" : "#F3F2F2", }]}>
            <FlatList
                ListHeaderComponent={<Header />}
                data={notifications}
                renderItem={({ item }) => <NotificationItem item={item} />}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    notificationItem: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    notificationTextContainer: {
        flex: 1,
    },
    notificationText: {
        fontSize: 16,
    },
    username: {
        fontWeight: 'bold',
    },
    notificationIcon: {
        fontSize: 20,
        marginLeft: 10,
    },
    separator: {
        height: 1,
        backgroundColor: '#ddd',
        marginHorizontal: 15,
    },
    headerContainer: {
        padding: 2,
        height: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingLeft: 10
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 100,
        width: 40,
        height: 40,
    },
    searchInput: {
        flex: 1,
        height: 40,
        marginLeft: 10,
    },
});

export default NotificationsScreen;
