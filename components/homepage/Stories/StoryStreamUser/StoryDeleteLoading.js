import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { useDarkMode } from '../../../Context/AppContext';
import { useTranslation } from 'react-i18next';

const StoryDeleteLoading = () => {

    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();
    return (
        <View
            style={styles.container}>


            <View
                style={{
                    width: "100%",
                    height: 100,
                    //backgroundColor: "red",
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <ActivityIndicator
                    size="large"
                    color="white"
                />


            </View>

            <View
                style={{
                    width: "100%",
                   // backgroundColor: "blue",
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text
                    style={{
                        fontSize: 20,
                        color: isDarkMode ? "white" : "white",
                    }}
                >
                    {t("DeleteStoryLoading")}
                </Text>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "black"
    }
})
export default StoryDeleteLoading